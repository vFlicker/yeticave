from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from yeticave.core.types import AuthenticatedHttpRequest

from ..forms.LotForm import LotForm
from ..services.LotService import LotService


@require_http_methods(["GET", "POST"])
@login_required
def create_lot(request: AuthenticatedHttpRequest) -> HttpResponse:
    TEMPLATE = "lots/create_lot.html"

    form = LotForm(request.POST or None)

    if form.is_valid():
        LotService.create_lot(
            creator=request.user,
            title=form.cleaned_data["title"],
            description=form.cleaned_data["description"],
            starting_bid=form.cleaned_data["starting_bid"],
            image_url=form.cleaned_data["image_url"],
            category=form.cleaned_data["category"],
            finished_at=form.cleaned_data["finished_at"],
        )

        return HttpResponseRedirect(reverse("lots:lot_list"))

    context = {
        "form": form,
    }

    return render(request, TEMPLATE, context)
