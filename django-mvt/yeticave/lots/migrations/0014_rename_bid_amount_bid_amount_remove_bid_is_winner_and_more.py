# Generated by Django 4.2.13 on 2024-06-06 14:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("lots", "0013_rename_starting_bid_lot_starting_price_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="bid",
            old_name="bid_amount",
            new_name="amount",
        ),
        migrations.RemoveField(
            model_name="bid",
            name="is_winner",
        ),
        migrations.AlterField(
            model_name="bid",
            name="bidder",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="bids",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterField(
            model_name="bid",
            name="lot",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="bids",
                to="lots.lot",
            ),
        ),
        migrations.AlterField(
            model_name="lot",
            name="creator",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="created_lots",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]