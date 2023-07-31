# Generated by Django 4.2.1 on 2023-07-25 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_historicalcustomuser'),
    ]

    operations = [
        migrations.CreateModel(
            name='Googleurl',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=8000, verbose_name='Google_url')),
            ],
            options={
                'verbose_name': 'Google url',
                'verbose_name_plural': 'Google urls',
            },
        ),
    ]