from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import View

from ..forms import BidForm, CommentForm
from ..models import Bid, Comment, Lot


class lotView(View):
    COMMENT_FORM_TYPE = "comment"
    BID_FORM_TYPE = "bid"
    TEMPLATE_NAME = "lots/lot.html"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.comment_form = CommentForm()
        self.bid_form = BidForm()

    def get(self, request, lot_id):
        return self.render_lot_page(request, lot_id)

    def post(self, request, lot_id):
        form_type = request.POST.get("form_type")

        if form_type == self.COMMENT_FORM_TYPE:
            return self.handle_comment_form(request, lot_id)
        elif form_type == self.BID_FORM_TYPE:
            return self.handle_bid_form(request, lot_id)

        return self.render_lot_page(request, lot_id)

    def render_lot_page(self, request, lot_id):
        lot = get_object_or_404(Lot.objects.with_in_watchlist(request.user), pk=lot_id)
        is_creator = lot.creator == request.user
        comments = Comment.objects.filter(lot=lot).order_by("-created_at")
        bids = Bid.objects.filter(lot=lot).order_by("-bid_time")[:10]

        return render(
            request,
            self.TEMPLATE_NAME,
            {
                "lot": lot,
                "is_creator": is_creator,
                "bid_form": self.bid_form,
                "comment_form": self.comment_form,
                "bids": bids,
                "comments": comments,
            },
        )

    def handle_comment_form(self, request, lot_id):
        self.comment_form = CommentForm(request.POST)
        if self.comment_form.is_valid():
            comment = self.comment_form.save(commit=False)
            comment.lot = get_object_or_404(Lot, pk=lot_id)
            comment.user = request.user
            comment.save()
            return HttpResponseRedirect(reverse("lots:lot", args=[lot_id]))
        return self.render_lot_page(request, lot_id)

    def handle_bid_form(self, request, lot_id):
        self.bid_form = BidForm(request.POST)
        if self.bid_form.is_valid():
            bid = self.bid_form.save(commit=False)
            lot = get_object_or_404(Lot, pk=lot_id)
            bid.lot = lot
            bid.bidder = request.user
            if bid.bid_amount > lot.current_price:
                bid.save()
                lot.current_price = bid.bid_amount
                lot.save()
                return HttpResponseRedirect(reverse("lots:lot", args=[lot_id]))
            else:
                self.bid_form.add_error(
                    "bid_amount", "Bid must be greater than the current price"
                )
        return self.render_lot_page(request, lot_id)
