# Generated by Django 4.2.1 on 2023-07-28 23:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0006_historicalphoto'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teste',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Foto')),
            ],
        ),
    ]
