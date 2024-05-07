from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from ..forms import BidForm, CommentForm
from ..models import Bid, Comment, Lot


@require_http_methods(["GET", "POST"])
@login_required
def lot(request: HttpRequest, lot_id: int) -> HttpResponse:
    form_type = request.POST.get("form_type")

    comment_form = CommentForm(request.POST or None)
    bid_form = BidForm(request.POST or None)

    if form_type == "comment":
        comment = comment_form.save(commit=False)
        comment.lot = get_object_or_404(Lot, pk=lot_id)
        comment.user = request.user
        comment.save()
        return HttpResponseRedirect(reverse("lots:lot", args=[lot_id]))
    elif form_type == "bid":
        bid = bid_form.save(commit=False)
        lot = get_object_or_404(Lot, pk=lot_id)
        bid.lot = lot
        bid.bidder = request.user

        if bid.bid_amount > lot.current_price:
            bid.save()
            lot.current_price = bid.bid_amount
            lot.save()
            return HttpResponseRedirect(reverse("lots:lot", args=[lot_id]))
        else:
            bid_form.add_error(
                "bid_amount", "Bid must be greater than the current price"
            )

    lot = get_object_or_404(Lot.objects.with_in_watchlist(request.user), pk=lot_id)
    is_creator = lot.creator == request.user
    comments = Comment.objects.filter(lot=lot).order_by("-created_at")
    bids = Bid.objects.filter(lot=lot).order_by("-bid_time")[:10]

    context = {
        "lot": lot,
        "is_creator": is_creator,
        "bid_form": bid_form,
        "comment_form": comment_form,
        "bids": bids,
        "comments": comments,
    }

    return render(request, "lots/lot.html", context)
