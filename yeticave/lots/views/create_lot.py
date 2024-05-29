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
        LotService.create_lot(**form.cleaned_data, creator=request.user)
        return HttpResponseRedirect(reverse("lots:lot_list"))

    context = {
        "form": form,
    }

    return render(request, TEMPLATE, context)
