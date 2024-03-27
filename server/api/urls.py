from django.urls import path
from . import views

urlpatterns = [
    path('properties', views.property_list, name='property_list'),
    path('properties/<int:id>', views.property_by_id, name='property_by_id'),
    path('orders/buy/<int:id>', views.buy_orders, name='buy_orders'),
    path('orders/sell/<int:id>', views.sell_orders, name='sell_orders'),
    path('funds/<int:id>', views.funds, name='funds'),
    path('watchlist/<int:id>', views.watchlist, name='watchlist'),
    path('portfolio/<int:id>', views.portfolio, name='portfolio'),
    path('marketorder', views.marketOrder, name='market_order'),
    path('limitorder', views.limitOrder, name='limit_order'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('users/<int:id>', views.get_user, name='get_user'),
    path('support', views.support, name='support'),
]