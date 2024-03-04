from rest_framework import serializers

from .models import Property, UserProfile, Order, OrderBook


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'


class BuyOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'user', 'property', 'price', 'order_type')


class SellOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'user', 'property', 'price', 'order_type')


class OrderBookSerializer(serializers.ModelSerializer):
    buy_orders = BuyOrderSerializer(many=True, read_only=True)
    sell_orders = SellOrderSerializer(many=True, read_only=True)

    class Meta:
        model = OrderBook
        fields = ('id', 'property', 'buy_orders', 'sell_orders')