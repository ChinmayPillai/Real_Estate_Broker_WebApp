from django.urls import path
from . import views

urlpatterns = [
    path('properties', views.property),
    path('properties/<int:id>', views.property_by_id),
    path('orders/buy/<int:id>', views.buy_orders),
    path('orders/sell/<int:id>', views.sell_orders),
    path('register/', views.register),
    path('login/', views.login),    
]