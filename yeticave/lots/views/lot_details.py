from typing import cast

from django.contrib.auth.models import User
from django.http import HttpRequest, HttpResponse
from django.shortcuts import get_object_or_404, render
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
def lot_details(request: HttpRequest, lot_id: int) -> HttpResponse:
    TEMPLATE = "lots/lot.html"

    user = cast(User, request.user)
    lot = __get_lot(request, lot_id)

    bid_form = BidForm()
    comment_form = CommentForm()

    form_type = request.POST.get("form_type")

    if request.method == "POST" and form_type == "comment":
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            CommentService.add_comment(
                author=user,
                lot=lot,
                text=comment_form.cleaned_data["text"],
            )

    if request.method == "POST" and form_type == "bid":
        bid_form = BidForm(request.POST)
        if bid_form.is_valid():
            try:
                BidService.place_bid(
                    bidder=user,
                    lot=lot,
                    bid_amount=bid_form.cleaned_data["bid_amount"],
                )
            except BidAmountError as error:
                bid_form.add_error("bid_amount", str(error))

    context = {
        "lot": lot,
        "is_creator": LotService.check_creator(lot, user),
        "bid_form": bid_form,
        "comment_form": comment_form,
        "bids": Bid.objects.get_all_bids(lot_id=lot_id)[:10],
        "comments": Comment.objects.get_all_comments(lot_id=lot_id)[:10],
    }

    return render(request, TEMPLATE, context)


def __get_lot(request: HttpRequest, lot_id: int) -> Lot:
    if request.user.is_anonymous:
        return get_object_or_404(Lot, pk=lot_id)

    user = cast(User, request.user)
    return get_object_or_404(Lot.objects.with_watchlist_status(user), pk=lot_id)
