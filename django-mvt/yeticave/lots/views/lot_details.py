from typing import TYPE_CHECKING, Optional

from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from yeticave.core.utils import get_authenticated_user

from ..forms.BidForm import BidForm
from ..forms.CommentForm import CommentForm
from ..models.Bid import Bid
from ..models.Comment import Comment
from ..models.Lot import Lot
from ..services.BidService import BidAmountError, BidService
from ..services.CommentService import CommentService
from ..services.LotService import LotService

if TYPE_CHECKING:
    from yeticave.users.models import User


@require_http_methods(["GET", "POST"])
def lot_details(request: HttpRequest, lot_id: int) -> HttpResponse:
    TEMPLATE = "lots/lot_details.html"

    bid_form = BidForm()
    comment_form = CommentForm()

    auth_user = get_authenticated_user(request)
    lot = __get_lot(auth_user, lot_id)

    if request.method == "POST" and auth_user:
        form_type = request.POST.get("form_type")

        if form_type == "comment":
            comment_form = __handle_comment_form(request, auth_user, lot)
        elif form_type == "bid":
            bid_form = __handle_bid_form(request, auth_user, lot)
        elif form_type == "complete_auction":
            LotService.complete_auction(lot)
            return HttpResponseRedirect(reverse("lots:lot_list"))
        elif form_type == "comment_reaction":
            CommentService.toggle_reaction(
                user=auth_user,
                comment_id=int(request.POST.get("comment_id")),
                reaction_type=request.POST.get("reaction_type"),
            )

    context = {
        "lot": lot,
        "is_creator": lot.creator == auth_user,
        "bid_form": bid_form,
        "comment_form": comment_form,
        "bids": Bid.objects.select_related("bidder").get_latest_bids_by_id(lot_id)[:10],
        "comments": __get_comments(auth_user, lot_id),
    }

    return render(request, TEMPLATE, context)


def __get_lot(user: Optional["User"], lot_id: int) -> Lot:
    if user is None:
        return get_object_or_404(Lot, pk=lot_id)
    return get_object_or_404(
        Lot.objects.select_related("creator").with_watchlist_status(user), pk=lot_id
    )


def __get_comments(user: Optional["User"], lot_id: int):
    comments = Comment.objects.with_counts().get_latest_comments_by_id(lot_id)[:10]
    if user:
        comments = comments.with_user_reactions(user)
    return comments


def __handle_comment_form(request: HttpRequest, user: "User", lot: Lot) -> CommentForm:
    comment_form = CommentForm(request.POST)

    if comment_form.is_valid():
        CommentService.add_comment(
            author=user,
            lot=lot,
            text=comment_form.cleaned_data["text"],
        )

    return comment_form


def __handle_bid_form(request: HttpRequest, user: "User", lot: Lot) -> BidForm:
    bid_form = BidForm(request.POST)

    if bid_form.is_valid():
        try:
            BidService.place_bid(
                bidder=user,
                lot=lot,
                amount=bid_form.cleaned_data["amount"],
            )
        except BidAmountError as error:
            bid_form.add_error("amount", str(error))

    return bid_form
