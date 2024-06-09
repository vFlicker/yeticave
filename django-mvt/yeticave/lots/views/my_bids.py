from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from yeticave.core.types import AuthenticatedHttpRequest

from ..models.Bid import Bid


@require_http_methods(["GET"])
@login_required
def my_bids(request: AuthenticatedHttpRequest) -> HttpResponse:
    TEMPLATE = "lots/my_bids.html"

    context = {
        "bids": Bid.objects.get_user_bids(request.user),
    }

    return render(request, TEMPLATE, context)
