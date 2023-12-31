from django.db import models
from django.contrib.auth.models import AbstractUser


GENDER_SELECTION = [
    ('M', 'Male'),
    ('F', 'Female'),
    ('NS', 'Not Specified'),
]

class CustomUser(AbstractUser):

    gender = models.CharField(max_length=20, choices=GENDER_SELECTION)
    user_photo = models.ImageField('User Photo', default='user_place_holder.jpg', blank=True, null=True)
    phone  = models.CharField(max_length=30, blank=True, null=True)
    username = models.CharField(("Nome"), max_length=50, unique=False, primary_key=None)
    email = models.EmailField("E-mail", unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone']

    def __str__(self):
        
        if self.username:
            return self.username
        elif self.first_name:
            return self.first_name
        elif self.last_name:
            return self.last_name
        else:
            return self.email

class Googleurl (models.Model):

    url = models.CharField(("Google_url"), max_length=8000)

    class Meta:
        verbose_name = ("Google url")
        verbose_name_plural = ("Google urls")

    def __str__(self):
        return str(self.url)