from rest_framework import serializers
from users.models import CustomUser, Googleurl


class UserSerializer (serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ('pk', 'email', 'username')
        
class GoogleUrlSerializers (serializers.ModelSerializer):
    
    class Meta:
        model = Googleurl
        fields = ['url']
         