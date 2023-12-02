from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import View
from django.views.decorators.http import require_http_methods

from .forms import BidForm, CommentForm, ListingForm
from .models import Bid, Comment, Listing

# TODO: Додати сторінку мої ставки/.

# TODO: Якщо користувач увійшов до облікового запису і він є автором аукціону,
# він повинен мати змогу «закрити» аукціон на цій сторінці, що зробить автора
# найбільшої ставки переможцем аукціону, а сам аукціон стане неактивним.

# TODO: Якщо користувач увійшов до облікового запису на сторінці закритого
# аукціону і він є переможцем цього аукціону, він має отримати повідомлення
# про це.


class ListingView(View):
    COMMENT_FORM_TYPE = "comment"
    BID_FORM_TYPE = "bid"
    TEMPLATE_NAME = "auctions/listing.html"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.comment_form = CommentForm()
        self.bid_form = BidForm()

    def get(self, request, listing_id):
        return self.render_listing_page(request, listing_id)

    def post(self, request, listing_id):
        form_type = request.POST.get("form_type")

        if form_type == self.COMMENT_FORM_TYPE:
            return self.handle_comment_form(request, listing_id)
        elif form_type == self.BID_FORM_TYPE:
            return self.handle_bid_form(request, listing_id)

        return self.render_listing_page(request, listing_id)

    def render_listing_page(self, request, listing_id):
        listing = get_object_or_404(
            Listing.objects.with_in_watchlist(request.user), pk=listing_id
        )
        is_creator = listing.creator == request.user
        comments = Comment.objects.filter(listing=listing).order_by("-created_at")
        bids = Bid.objects.filter(listing=listing).order_by("-bid_time")[:10]

        return render(
            request,
            self.TEMPLATE_NAME,
            {
                "listing": listing,
                "is_creator": is_creator,
                "bid_form": self.bid_form,
                "comment_form": self.comment_form,
                "bids": bids,
                "comments": comments,
            },
        )

    def handle_comment_form(self, request, listing_id):
        self.comment_form = CommentForm(request.POST)
        if self.comment_form.is_valid():
            comment = self.comment_form.save(commit=False)
            comment.listing = get_object_or_404(Listing, pk=listing_id)
            comment.user = request.user
            comment.save()
            return HttpResponseRedirect(reverse("auctions:listing", args=[listing_id]))
        return self.render_listing_page(request, listing_id)

    def handle_bid_form(self, request, listing_id):
        self.bid_form = BidForm(request.POST)
        if self.bid_form.is_valid():
            bid = self.bid_form.save(commit=False)
            listing = get_object_or_404(Listing, pk=listing_id)
            bid.listing = listing
            bid.bidder = request.user
            if bid.bid_amount > listing.current_price:
                bid.save()
                listing.current_price = bid.bid_amount
                listing.save()
                return HttpResponseRedirect(
                    reverse("auctions:listing", args=[listing_id])
                )
            else:
                self.bid_form.add_error(
                    "bid_amount", "Bid must be greater than the current price"
                )
        return self.render_listing_page(request, listing_id)


@require_http_methods(["GET"])
def index(request: HttpRequest) -> HttpResponse:
    # TODO: Має дозволити користувачам переглянути всі АКТИВНІ АУКЦІОНИ.
    if request.user.is_authenticated:
        listings = Listing.objects.all().with_in_watchlist(request.user)
    else:
        listings = Listing.objects.all()

    return render(
        request,
        "auctions/index.html",
        {
            "listings": listings,
        },
    )


@require_http_methods(["GET", "POST"])
@login_required
def create_listing(request: HttpRequest) -> HttpResponse:
    if request.method == "GET":
        form = ListingForm()
        return render(request, "auctions/create_listing.html", {"form": form})

    if (form := ListingForm(request.POST)).is_valid():
        listing = form.save(commit=False)
        listing.creator = request.user
        listing.save()
        return HttpResponseRedirect(reverse("auctions:index"))

    return render(request, "auctions/create_listing.html", {"form": form})
