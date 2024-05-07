from django.db.models.signals import pre_save
from django.dispatch import receiver

from .models import Lot


# TODO: do I need this signal?
@receiver(pre_save, sender=Lot)
def set_current_price(sender, instance, **kwargs):
    if not instance.current_price:
        instance.current_price = instance.starting_bid
