from django.contrib import admin

from .models import Bid, Comment, Lot

admin.site.register(Bid)
admin.site.register(Comment)
admin.site.register(Lot)
