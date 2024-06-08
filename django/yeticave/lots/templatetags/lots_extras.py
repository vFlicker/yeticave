from datetime import timedelta
from typing import TYPE_CHECKING

from django import template

from yeticave.core.utils.calculate_time_left import calculate_time_left
from yeticave.lots.constants import BidStatus

if TYPE_CHECKING:
    from ..models.Bid import Bid


register = template.Library()


@register.filter
def usd(value: int) -> str:
    """Format value as USD."""
    return f"${value:,.2f}"


@register.filter
def get_bid_class(bid: "Bid"):
    if bid.status == BidStatus.WON:
        return "rates__item--end rates__item--win"
    elif bid.status == BidStatus.LOST:
        return "rates__item--end"


@register.filter
def get_timer_class(bid: "Bid"):
    time_left = calculate_time_left(bid.lot.finished_at)

    if not bid.status == BidStatus.ACTIVE and time_left < timedelta(hours=12):
        return "timer--finishing"
    elif bid.status == BidStatus.WON:
        return "timer--win"
    elif bid.status == BidStatus.LOST:
        return "timer--end"


@register.filter
def get_timer_content(bid: "Bid"):
    time_left = calculate_time_left(bid.lot.finished_at)

    if bid.status == BidStatus.WON:
        return "Won"
    elif bid.status == BidStatus.LOST:
        return "End"
    else:
        return f"{time_left.days}d {time_left.seconds // 3600}h {time_left.seconds % 3600 // 60}m"
