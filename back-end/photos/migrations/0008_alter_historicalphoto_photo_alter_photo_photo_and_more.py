# Generated by Django 4.2.1 on 2023-07-31 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0007_teste'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalphoto',
            name='photo',
            field=models.TextField(blank=True, verbose_name='Foto'),
        ),
        migrations.AlterField(
            model_name='photo',
            name='photo',
            field=models.ImageField(blank=True, upload_to='', verbose_name='Foto'),
        ),
        migrations.AlterField(
            model_name='teste',
            name='photo',
            field=models.ImageField(blank=True, upload_to='', verbose_name='Foto'),
        ),
    ]
