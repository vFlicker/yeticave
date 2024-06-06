from datetime import timedelta
from typing import TYPE_CHECKING

from django import template

from yeticave.core.utils import calculate_time_left

if TYPE_CHECKING:
    from ..models.Bid import Bid


register = template.Library()


@register.filter
def usd(value: int) -> str:
    """Format value as USD."""
    return f"${value:,.2f}"


@register.filter
def get_bid_class(bid: "Bid"):
    if bid.is_winner:
        return "rates__item--end rates__item--win"
    elif not bid.lot.is_active:
        return "rates__item--end"


@register.filter
def get_timer_class(bid: "Bid"):
    time_left = calculate_time_left(bid.lot.finished_at)

    if not bid.lot.is_active and bid.is_winner:
        return "timer--win"
    elif not bid.lot.is_active or time_left < timedelta(seconds=0):
        return "timer--end"
    elif bid.lot.is_active and time_left < timedelta(hours=12):
        return "timer--finishing"


@register.filter
def get_timer_content(bid: "Bid"):
    time_left = calculate_time_left(bid.lot.finished_at)

    if not bid.lot.is_active and bid.is_winner:
        return "Won"
    elif not bid.lot.is_active or time_left < timedelta(seconds=0):
        return "End"
    else:
        return f"{time_left.days}d {time_left.seconds // 3600}h {time_left.seconds % 3600 // 60}m"
