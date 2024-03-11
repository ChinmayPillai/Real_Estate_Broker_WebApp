# Generated by Django 5.0.2 on 2024-03-11 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_userprofile_portfolio_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='description',
            field=models.CharField(blank=True, max_length=1000),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='portfolio',
            field=models.ManyToManyField(blank=True, default=[], related_name='portfolio', to='api.property'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='watchlist',
            field=models.ManyToManyField(blank=True, default=[], related_name='watchlist', to='api.property'),
        ),
        migrations.DeleteModel(
            name='OrderBook',
        ),
    ]
