from rest_framework import serializers
from ..models import Album
from photos.api.serializers import PhotoSerializers

class AlbumSerializers (serializers.ModelSerializer):

    cover = PhotoSerializers()
    photos = PhotoSerializers(many=True)
    class Meta:

        model = Album
        fields = ['id', 'title', 'discription', 'owner', 'shared_with', 'create_date', 'cover','photos', 'delete_on_reset_day']   
        
    def create(self, validated_data):
        input('entrou')
        customer_serializer = CustomerSerializer(validated_data.get('customer'))
        customer_serializer.save()
        return User.objects.create(**validated_data)
        