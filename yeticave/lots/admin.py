from django.contrib import admin

from .models.Bid import Bid
from .models.Comment import Comment
from .models.Lot import Lot
from .models.Watchlist import Watchlist

admin.site.register(Bid)
admin.site.register(Comment)
admin.site.register(Lot)
admin.site.register(Watchlist)
