from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods

from yeticave.core.types import AuthenticatedHttpRequest


@require_http_methods(["GET"])
@login_required
def my_bids(request: AuthenticatedHttpRequest) -> HttpResponse:
    TEMPLATE = "lots/my_bids.html"

    context = {
        "bids": request.user.bids.all(),
    }

    return render(request, TEMPLATE, context)
