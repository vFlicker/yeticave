from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods

from ..models import Lot, Watchlist


@require_http_methods(["POST"])
@login_required
def toggle_watchlist(request, lot_id):
    lot = get_object_or_404(Lot, pk=lot_id)

    # TODO: add function add_to_watchlist and remove_from_watchlist
    watchlist_item, created = Watchlist.objects.get_or_create(
        owner=request.user,
        item=lot,
    )

    if not created:
        watchlist_item.delete()
    else:
        item = watchlist_item.item
        message_test = f"{item.category.name} {item.title} added to watchlist."

        messages.add_message(
            request,
            settings.NOTIFICATION_LEVEL,
            message_test.capitalize(),
        )

    return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
