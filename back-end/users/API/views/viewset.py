from rest_framework import viewsets
from users.API.serializers.CustomUserDetailsSerializer import GoogleUrlSerializers, UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.models import Googleurl
from rest_framework.response import Response
from rest_framework import status

from django.contrib.auth import get_user_model
User = get_user_model()

class UserViewset (viewsets.ModelViewSet):
  
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        
        user = User.objects.get(id=request.user.id)

        
        serializer = UserSerializer(user)
        return Response(serializer.data)

class GoogleUrlViewSet (viewsets.ModelViewSet):
  
    queryset = Googleurl.objects.all()
    serializer_class = GoogleUrlSerializers
    http_method_names = ['get', 'post', 'put', 'delete','head']
    permission_classes = [AllowAny]
    
    def list(self, request, *args, **kwargs):
        
        
        url = Googleurl.objects.all().last()
        
        serializer = GoogleUrlSerializers(url)
        return Response(serializer.data)

    