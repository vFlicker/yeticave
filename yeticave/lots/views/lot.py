from typing import cast

from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from ..forms.BidForm import BidForm
from ..forms.CommentForm import CommentForm
from ..models.Bid import Bid
from ..models.Comment import Comment
from ..models.Lot import Lot
from ..services.BidService import BidAmountError, BidService
from ..services.CommentService import CommentService
from ..services.LotService import LotService


@require_http_methods(["GET", "POST"])
def lot(request: HttpRequest, lot_id: int) -> HttpResponse:
    TEMPLATE = "lots/lot.html"

    user = request.user
    is_creator = False
    comment_form = None
    bid_form = None

    if user.is_anonymous:
        lot = get_object_or_404(Lot, pk=lot_id)
    else:
        user = cast(User, user)

        form_type = request.POST.get("form_type")

        comment_form = CommentForm(request.POST or None)
        bid_form = BidForm(request.POST or None)

        lot = get_object_or_404(Lot.objects.with_watchlist_status(user), pk=lot_id)
        is_creator = LotService.check_creator(lot, user)

        if form_type == "comment" and comment_form.is_valid():
            CommentService.add_comment(**comment_form.cleaned_data, user=user, lot=lot)
            return HttpResponseRedirect(reverse("lots:lot", args=[lot_id]))

        if form_type == "bid" and bid_form.is_valid():
            try:
                BidService.place_bid(**bid_form.cleaned_data, bidder=user, lot=lot)
                return HttpResponseRedirect(reverse("lots:lot", args=[lot_id]))
            except BidAmountError as error:
                bid_form.add_error("bid_amount", str(error))

    context = {
        "lot": lot,
        "is_creator": is_creator,
        "bid_form": bid_form,
        "comment_form": comment_form,
        "bids": Bid.objects.get_bids(lot_id=lot_id)[:10],
        "comments": Comment.objects.get_comments(lot_id=lot_id)[:10],
    }

    return render(request, TEMPLATE, context)
