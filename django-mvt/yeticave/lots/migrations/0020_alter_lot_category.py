# Generated by Django 4.2.13 on 2024-08-21 13:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("categories", "0002_alter_category_name"),
        ("lots", "0019_rename_reaction_commentreaction_reaction_type"),
    ]

    operations = [
        migrations.AlterField(
            model_name="lot",
            name="category",
            field=models.ForeignKey(
                default="boots",
                on_delete=django.db.models.deletion.CASCADE,
                to="categories.category",
            ),
        ),
    ]