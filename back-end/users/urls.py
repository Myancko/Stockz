
from django.urls import path, include
from users.API.views.GoogleLoginView import GoogleLoginView, UserRedirectView
from dj_rest_auth.views import LoginView, LogoutView
from .views import google_view

urlpatterns = [
    #dj rest auth | social authentication

    path('google/get_redirect/', google_view.as_view(),  name='redirect'),
    path('google/login', GoogleLoginView.as_view(), name='google_login'),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls'), name='socialaccount_signup'),
    path("~redirect/", view=UserRedirectView.as_view(), name="redirect"),
    
]
