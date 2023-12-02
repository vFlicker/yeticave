from django import template

register = template.Library()


@register.filter(name="usd")
def usd(value):
    """Format value as USD."""
    return f"${value:,.2f}"
