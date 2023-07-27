from rest_framework import viewsets
from users.API.serializers.CustomUserDetailsSerializer import GoogleUrlSerializers
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.models import Googleurl
from rest_framework.response import Response
from rest_framework import status

class GoogleUrlViewSet (viewsets.ModelViewSet):
  
    queryset = Googleurl.objects.all()
    serializer_class = GoogleUrlSerializers
    http_method_names = ['get', 'post', 'put', 'delete','head']
    permission_classes = [AllowAny]
    
    def list(self, request, *args, **kwargs):
        
        
        url = Googleurl.objects.all().last()
        
        serializer = GoogleUrlSerializers(url)
        return Response(serializer.data)

    