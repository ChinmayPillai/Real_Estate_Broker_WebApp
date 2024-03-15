from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Property, Order
from .serializers import PropertySerializer, OrderSerializer, RegisterSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import check_password
from .models import UserProfile 




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


# API to get best (lowest) 5 sell orders for a specific property
@api_view(['GET'])
def sell_orders(request, id):
    orders = Order.objects.filter(prop=id, order_type='sell').order_by('price')[:5]
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

# API to register a new user
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


from .models import UserProfile  # Assuming UserProfile is in the same directory as views.py
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        # Retrieve user by username
        try:
            user = UserProfile.objects.get(username=username)
        except UserProfile.DoesNotExist:
            # User not found
            return Response({"message": "Invalid username or password"}, status=401)

        # Check if the provided password matches the hashed password
        if check_password(password, user.password):
            # Passwords match, authentication successful
            return Response({"message": "Login successful", "user": user.username}, status=200)
        else:
            # Passwords don't match, authentication failed
            return Response({"message": "Invalid username or password"}, status=401)
    else:
        # Method not allowed
        return Response({"message": "Only POST requests are allowed"}, status=405)