from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Property, Order, UserProfile
from .serializers import PropertySerializer, OrderSerializer, RegisterSerializer
from django.contrib.auth.hashers import check_password


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
    

# API to get/update user funds
@api_view(['GET', 'PUT'])
def funds(request, id):
    try:
        user = UserProfile.objects.get(id=id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response({"funds": user.funds})
    
    elif request.method == 'PUT':
        action = request.data.get('action')
        amount = request.data.get('amount')
        if amount is None:
            return Response({"error": "'amount' field is required"}, status=status.HTTP_400_BAD_REQUEST)
        if action is None:
            return Response({"error": "'action' field is required"}, status=status.HTTP_400_BAD_REQUEST)
    

        if action == 'add':
            user.funds += amount
        elif action == 'withdraw':
            if(amount > user.funds):
                return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)
            user.funds -= amount
        else:
            return Response({"error": "Invalid action. Please use 'add' or 'withdraw'"}, status=status.HTTP_400_BAD_REQUEST)
        

        user.save()
        return Response({"funds": user.funds})


# API to get/add/remove properties from user watchlist
@api_view(['GET', 'PUT'])
def watchlist(request, id):
    try:
        user = UserProfile.objects.get(id=id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response({"watchlist": user.watchlist})
    
    elif request.method == 'PUT':
        action = request.data.get('action')
        if action is None:
            return Response({"error": "action field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        property_id = request.data.get('property_id')
        if property_id is None:
            return Response({"error": "property_id field is required"}, status=status.HTTP_400_BAD_REQUEST)

        if action == 'add':            
            if user.watchlist is None:
                user.watchlist = [property_id]
            elif property_id not in user.watchlist:
                user.watchlist.append(property_id)
        
        elif action == 'remove':
            if user.watchlist is not None and property_id in user.watchlist:
                user.watchlist.remove(property_id)
        else:
            return Response({"error": "Invalid action. Please use 'add' or 'remove'"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.save()
        return Response({"watchlist": user.watchlist})



# API to get/add/remove properties from user portfolio
@api_view(['GET', 'PUT'])
def portfolio(request, id):
    try:
        user = UserProfile.objects.get(id=id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response({"portfolio": user.portfolio})
    
    elif request.method == 'PUT':
        action = request.data.get('action')
        if action is None:
            return Response({"error": "action field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        property_id = request.data.get('property_id')
        if property_id is None:
            return Response({"error": "property_id field is required"}, status=status.HTTP_400_BAD_REQUEST)

        if action == 'add':            
            if user.portfolio is None:
                user.portfolio = [property_id]
            elif property_id not in user.portfolio:
                user.portfolio.append(property_id)
        
        elif action == 'remove':
            if user.portfolio is not None and property_id in user.portfolio:
                user.portfolio.remove(property_id)
        else:
            return Response({"error": "Invalid action. Please use 'add' or 'remove'"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.save()
        return Response({"portfolio": user.portfolio})
    

# API to place Market Order
@api_view(['PUT'])
def marketOrder(request):

    action = request.data.get('action')
    if action is None:
        return Response({"error": "action field is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    user_id = request.data.get('user_id')
    if user_id is None:
        return Response({"error": "user_id field is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    property_id = request.data.get('property_id')
    if property_id is None:
        return Response({"error": "property_id field is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = UserProfile.objects.get(id=user_id)
    except UserProfile.DoesNotExist:
        return Response({"error": "Invalid User Id"}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        property = Property.objects.get(id=property_id)
    except Property.DoesNotExist:
        return Response({"error": "Invalid Property Id"}, status=status.HTTP_404_NOT_FOUND)
    
    if action == 'buy':
        orders = Order.objects.filter(prop=property_id, order_type='sell').order_by('price')
        if orders is None or orders.count() == 0:
            return Response({"error": "No sell orders available for this property"}, status=status.HTTP_400_BAD_REQUEST)
        order = orders[0]
        price = order.price

        seller = order.user

        if user.funds < price:
            return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.funds -= price
        seller.funds += price
        user.money_invested += price
        # seller.money_invested -= price
        if user.portfolio is None:
            user.portfolio = []
        user.portfolio.append(property_id)
        seller.portfolio.remove(property_id)
        property.ltp = price
        user.save()
        seller.save()
        property.save()
        
        order.delete()
        
    elif action == 'sell':
        if property_id not in user.portfolio:
            return Response({"error": "Property not in portfolio"}, status=status.HTTP_400_BAD_REQUEST)
        
        orders = Order.objects.filter(prop=property_id, order_type='buy').order_by('-price')
        if orders is None or orders.count() == 0:
            return Response({"error": "No buy orders available for this property"}, status=status.HTTP_400_BAD_REQUEST)
        order = orders[0]
        price = order.price

        seller = order.user

        
        user.funds += price
        seller.funds -= price
        # user.money_invested -= price
        seller.money_invested += price
        user.portfolio.remove(property_id)
        if seller.portfolio is None:
            seller.portfolio = []
        seller.portfolio.append(property_id)
        property.ltp = price
        user.save()
        seller.save()
        property.save()
        
        order.delete()

    else:
        return Response({"error": "Invalid action. Please use 'buy' or 'sell'"}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"funds": user.funds, "portfolio": user.portfolio})


# API to place Limit Order
@api_view(['POST'])
def limitOrder(request):
    
        action = request.data.get('action')
        if action is None:
            return Response({"error": "action field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user_id = request.data.get('user_id')
        if user_id is None:
            return Response({"error": "user_id field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        property_id = request.data.get('property_id')
        if property_id is None:
            return Response({"error": "property_id field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        price = request.data.get('price')
        if price is None:
            return Response({"error": "price field is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = UserProfile.objects.get(id=user_id)
        except UserProfile.DoesNotExist:
            return Response({"error": "Invalid User Id"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            property = Property.objects.get(id=property_id)
        except Property.DoesNotExist:
            return Response({"error": "Invalid Property Id"}, status=status.HTTP_404_NOT_FOUND)
        
        # Making the assumption that user won't use up the funds in the time between order placement and execution
        if action == 'buy':
            if user.funds < price:
                return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)  
        elif action == 'sell':
            if property_id not in user.portfolio:
                return Response({"error": "Property not in portfolio"}, status=status.HTTP_400_BAD_REQUEST)            
        else:
            return Response({"error": "Invalid action. Please use 'buy' or 'sell'"}, status=status.HTTP_400_BAD_REQUEST)
        
                    
        order = Order(user=user, prop=property, price=price, order_type=action)
        order.save()

        return Response({"funds": user.funds, "portfolio": user.portfolio})

