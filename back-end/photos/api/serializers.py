from albuns.models import Album
from rest_framework import serializers
from ..models import Photo

class PhotoSerializers (serializers.ModelSerializer):
 
    class Meta:

        model = Photo
        fields = ['id', 'title', 'drive_id', 'photo', 'owner']
