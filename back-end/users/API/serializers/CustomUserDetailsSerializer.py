from rest_framework import serializers
from users.models import CustomUser, Googleurl


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = (
            'pk',
            'email',
            'phone',
            'gender',
        )
        read_only_fields = ('pk', 'email', 'username')
        
class GoogleUrlSerializers (serializers.ModelSerializer):
    
    class Meta:
        model = Googleurl
        fields = ['url']
         