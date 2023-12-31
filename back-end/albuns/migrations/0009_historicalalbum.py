# Generated by Django 4.2.1 on 2023-07-24 10:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    dependencies = [
        ('photos', '0005_rename_discription_photo_drive_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('albuns', '0008_alter_album_photos'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoricalAlbum',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Titulo')),
                ('discription', models.CharField(max_length=500, verbose_name='Descrição')),
                ('create_date', models.DateTimeField(blank=True, editable=False, verbose_name='Data de criação')),
                ('last_modified', models.DateTimeField(blank=True, editable=False, verbose_name='Ultima alteração')),
                ('delete_on_reset_day', models.BooleanField(default=False, verbose_name='Deletar no dia de exclusão')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('cover', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='photos.photo')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('owner', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL, verbose_name='Dono')),
            ],
            options={
                'verbose_name': 'historical album',
                'verbose_name_plural': 'historical albums',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
