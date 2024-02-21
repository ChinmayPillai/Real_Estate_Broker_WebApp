from django.urls import path
from . import views

#URL Conf
urlpatterns = [
    path('', views.test),
]