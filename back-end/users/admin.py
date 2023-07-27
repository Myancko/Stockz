from django.contrib import admin
from .models import CustomUser, Googleurl
from simple_history.admin import SimpleHistoryAdmin
# Register your models here.

admin.site.register(CustomUser, SimpleHistoryAdmin)
admin.site.register(Googleurl)