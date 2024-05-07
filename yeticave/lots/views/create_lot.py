from django.contrib.auth.decorators import login_required
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.http import require_http_methods

from ..forms import LotForm


@require_http_methods(["GET", "POST"])
@login_required
def create_lot(request: HttpRequest) -> HttpResponse:
    form = LotForm(request.POST or None)

    if form.is_valid():
        lot = form.save(commit=False)
        lot.creator = request.user
        lot.save()
        return HttpResponseRedirect(reverse("lots:index"))

    context = {
        "form": form,
    }

    return render(request, "lots/create_lot.html", context)
