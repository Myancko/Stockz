from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from .models import Googleurl

class google_view (APIView):
    
    permission_classes = [permissions.AllowAny]
    
    def get (self, request):
        
        print('gg', request.GET.get('code') ,request.build_absolute_uri() )
        
        url_value = request.GET.get('code')
        x = str(request.GET.get('code'))
        url = Googleurl.objects.create(url=x)
        url.save()
        
        return HttpResponseRedirect(redirect_to='http://127.0.0.1:3000/google')

