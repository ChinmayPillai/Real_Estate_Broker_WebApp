from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Property, Order
from .serializers import PropertySerializer, OrderSerializer

# API to get All Properties
@api_view(['GET'])
def property(request):
    property = Property.objects.all()
    serializer = PropertySerializer(property, many=True)
    return Response({"properties": serializer.data})


# API to get, update and delete Property by ID
@api_view(['GET', 'PUT', 'DELETE'])
def property_by_id(request, id):

    try:
        property = Property.objects.get(id=id)
    except Property.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':        
        serializer = PropertySerializer(property, many=False)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PropertySerializer(property, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        property.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# API to get best (highest) 5 buy orders for a specific property
@api_view(['GET'])
def buy_orders(request, id):
    orders = Order.objects.filter(prop=id, order_type='buy').order_by('-price')[:5]
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

