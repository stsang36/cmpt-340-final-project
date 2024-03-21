# Generated by Django 5.0.3 on 2024-03-18 00:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userpreferences', '0010_alter_preferences_frequent_used_words_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='preferences',
            name='color_blind',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='preferences',
            name='high_contrast',
            field=models.BooleanField(default=False),
        ),
    ]