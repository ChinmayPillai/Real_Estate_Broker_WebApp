import json
from django.test import RequestFactory, TestCase
from api.models import UserProfile, Property, Order, Support
from rest_framework import status
from api.views import register, login, marketOrder, limitOrder, property, property_by_id, buy_orders, sell_orders, funds, watchlist, portfolio, get_user, support
from api.serializers import PropertySerializer
from django.contrib.auth.hashers import make_password

    
class TestPropertyById(TestCase):

    # The function returns a valid property object when given a valid id and a GET request.
    def test_valid_property_object(self):
        # Arrange
        id = 1
        request = RequestFactory().get(f'/properties/{id}')
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)
        serializer = PropertySerializer(property, many=False)
    
        # Act
        response = property_by_id(request, id)
    
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    # The function returns a 404 status code when given an invalid id and a GET request.
    def test_invalid_id_404(self):
        # Arrange
        id = 999
        request = RequestFactory().get(f'/properties/{id}')
    
        # Act
        response = property_by_id(request, id)
    
        # Assert
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # The function returns a 404 status code when given an invalid id and a DELETE request.
    def test_invalid_id_delete_request(self):
        # Arrange
        id = 9999
        request = RequestFactory().delete(f'/properties/{id}')
    
        # Act
        response = property_by_id(request, id)
    
        # Assert
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # The function returns a 400 status code when given invalid data and a PUT request.
    def test_invalid_data_returns_400(self):
        # Arrange
        id = 1
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)
        request = RequestFactory().put(f'/properties/{id}')
        request.data = {'name': 'Test Property', 'category': 'Test Category', 'description': 'Test Description', 'image': 'Test Image', 'location': 'Test Location', 'ltp': 'invalid'}

        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # The function returns a serialized property object when given valid data and a PUT request.
    def test_valid_property_object(self):
        # Arrange
        id = 1
        request = RequestFactory().get(f'/properties/{id}')
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)
        serializer = PropertySerializer(property, many=False)

        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    # The function returns a 400 status code when given a PUT request with missing data.
    def test_put_request_with_missing_data(self):
        # Arrange
        id = 1
        request = RequestFactory().put(f'/properties/{id}')
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)

        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # The function returns a 204 status code when a property object is successfully deleted.
    def test_delete_property_object_successfully(self):
        # Arrange
        id = 1
        request = RequestFactory().delete(f'/properties/{id}')
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)

        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    # The function returns a serialized property object when given a valid id and a GET request.
    def test_valid_property_object(self):
        # Arrange
        id = 1
        request = RequestFactory().get(f'/properties/{id}')
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)
        serializer = PropertySerializer(property, many=False)

        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    # The function updates and returns a valid property object when given a valid id and a PUT request with valid data.
    def test_valid_property_update(self):
        # Arrange
        id = 1
        request_data = {
        'name': 'Updated Property',
        'category': 'Updated Category',
        'description': 'Updated Description',
        'image': 'Updated Image',
        'location': 'Updated Location',
        'ltp': 200.00
        }
        request = RequestFactory().put(
            f'/properties/{id}',
            data=json.dumps(request_data),
            content_type='application/json'
        )
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)
        serializer = PropertySerializer(property, many=False)
        serializer.update(property, request_data)
        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    # The function deletes a property object when given a valid id and a DELETE request.
    def test_delete_valid_property_object(self):
        # Arrange
        id = 1
        request = RequestFactory().delete(f'/properties/{id}')
        property = Property.objects.create(id=1, name='Test Property', category='Test Category', description='Test Description', image='Test Image', location='Test Location', ltp=100.00)

        # Act
        response = property_by_id(request, id)

        # Assert
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestLoginRegister(TestCase):

    # POST request to /register with invalid data returns 400
    def test_post_register_invalid_data_returns_400(self):
        # Arrange
        request = RequestFactory().post('/register', data={'name': 'John', 'username': 'john123', 'email': 'john@example.com', 'phone': '1234567890', 'pan': 'ABCDE1234F'})
    
        # Act
        response = register(request)
    
        # Assert
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    

    # POST request to /register with valid data registers a new user
    def test_register_with_valid_data(self):
        # Arrange
        data = {
            'name': 'John Doe',
            'username': 'johndoe',
            'email': 'johndoe@example.com',
            'phone': '9876543210',
            'pan': 'ABCDE1234F',
            'password': 'password123'
        }
        request = RequestFactory().post('/register', data=data)
    
        # Act
        response = register(request)
    
        # Assert
        assert response.status_code == status.HTTP_201_CREATED
        assert 'message' in response.data
        assert response.data['message'] == 'User registered successfully'

    

    # POST request to /login with valid credentials logs in a user
    def test_login_with_valid_credentials(self):
        # Arrange
        username = 'test_user'
        password = 'test_password'
        UserProfile.objects.create(username=username, password=make_password(password))
        data = {
            'username': username,
            'password': password
        }
        request = RequestFactory().post('/login', data=data)

        # Act
        response = login(request)
    
        # Assert
        assert response.status_code == status.HTTP_200_OK
        assert 'message' in response.data
        assert response.data['message'] == 'Login successful'
        assert 'user' in response.data
        assert response.data['user'] == UserProfile.objects.get(username=username).id
    
     # POST request to /login with invalid credentials returns 401
    def test_login_with_invalid_credentials_returns_401(self):
        # Arrange
        request_data = {
            'username': 'invalid_username',
            'password': 'invalid_password'
        }
        request = RequestFactory().post('/login', data=request_data)
    
        # Act
        response = login(request)
    
        # Assert
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        assert response.data['message'] == 'Invalid username or password'




# class TestCodeUnderTest(TestCase):

#     # GET request to /property returns all properties
#     def test_get_all_properties(self):
#         # Arrange
#         request = RequestFactory().get('/property')
    
#         # Act
#         response = property(request)
    
#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert 'properties' in response.data
#         assert len(response.data['properties']) > 0

#     # GET request to /property_by_id/{id} with invalid id returns 404
#     def test_get_property_by_invalid_id(self):
#         # Arrange
#         invalid_id = 9999
#         request = RequestFactory().get(f'/property_by_id/{invalid_id}')
    
#         # Act
#         response = property_by_id(request, invalid_id)
    
#         # Assert
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     # GET request to /property_by_id/{id} returns property with given id
#     def test_get_property_by_id_returns_property_with_given_id(self):
#         # Arrange
#         property_id = 1
#         request = RequestFactory().get(f'/property_by_id/{property_id}')

#         # Act
#         response = property_by_id(request, property_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert 'name' in response.data
#         assert 'category' in response.data
#         assert 'description' in response.data
#         assert 'image' in response.data
#         assert 'location' in response.data
#         assert 'ltp' in response.data

#     # PUT request to /property_by_id/{id} updates property with given id
#     def test_update_property_by_id(self):
#         # Arrange
#         property_id = 1
#         data = {
#             'name': 'Updated Property',
#             'category': 'Updated Category',
#             'description': 'Updated Description',
#             'image': 'Updated Image',
#             'location': 'Updated Location',
#             'ltp': 1000.00
#         }
#         request = RequestFactory().put(f'/property_by_id/{property_id}', data=data)
#         property_obj = Property.objects.create(name='Property', category='Category', description='Description', image='Image', location='Location', ltp=500.00)

#         # Act
#         response = property_by_id(request, property_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert response.data['name'] == data['name']
#         assert response.data['category'] == data['category']
#         assert response.data['description'] == data['description']
#         assert response.data['image'] == data['image']
#         assert response.data['location'] == data['location']
#         assert response.data['ltp'] == str(data['ltp'])
#         assert Property.objects.get(id=property_id).name == data['name']
#         assert Property.objects.get(id=property_id).category == data['category']
#         assert Property.objects.get(id=property_id).description == data['description']
#         assert Property.objects.get(id=property_id).image == data['image']
#         assert Property.objects.get(id=property_id).location == data['location']
#         assert Property.objects.get(id=property_id).ltp == data['ltp']

#     # DELETE request to /property_by_id/{id} deletes property with given id
#     def test_delete_property_by_id(self):
#         # Arrange
#         property_id = 1
#         request = RequestFactory().delete(f'/property_by_id/{property_id}')

#         # Act
#         response = property_by_id(request, property_id)

#         # Assert
#         assert response.status_code == status.HTTP_204_NO_CONTENT

#     # GET request to /buy_orders/{id} returns top 5 buy orders for property with given id
#     def test_get_top_5_buy_orders_for_property(self):
#         # Arrange
#         property_id = 1
#         request = RequestFactory().get(f'/buy_orders/{property_id}')

#         # Act
#         response = buy_orders(request, property_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert len(response.data) <= 5
#         for order in response.data:
#             assert order['order_type'] == 'buy'
#             assert order['prop'] == property_id

#     # GET request to /sell_orders/{id} returns top 5 sell orders for property with given id
#     def test_get_top_5_sell_orders_for_property(self):
#         # Arrange
#         property_id = 1
#         request = RequestFactory().get(f'/sell_orders/{property_id}')

#         # Act
#         response = sell_orders(request, property_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert len(response.data) <= 5
#         for order in response.data:
#             assert order['order_type'] == 'sell'
#             assert order['prop'] == property_id

    
#     # GET request to /get_user/{id} returns user with given id
#     def test_get_user_returns_user_with_given_id(self):
#         # Arrange
#         user_id = 1
#         request = RequestFactory().get(f'/get_user/{user_id}')
    
#         # Act
#         response = get_user(request, user_id)
    
#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert 'name' in response.data
#         assert 'email' in response.data
#         assert 'phone' in response.data
#         assert 'funds' in response.data
#         assert 'money_invested' in response.data
#         assert 'pnl' in response.data
#         assert 'portfolio' in response.data
#         assert 'watchlist' in response.data
#         assert 'pan' in response.data

#     # DELETE request to /property_by_id/{id} with invalid id returns 404
#     def test_delete_invalid_property_by_id_returns_404(self):
#         # Arrange
#         invalid_id = 9999
#         request = RequestFactory().delete(f'/property_by_id/{invalid_id}')
    
#         # Act
#         response = property_by_id(request, invalid_id)
    
#         # Assert
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     # PUT request to /property_by_id/{id} with invalid id returns 404
#     def test_put_request_with_invalid_id_returns_404(self):
#         # Arrange
#         invalid_id = 9999
#         request = RequestFactory().put(f'/property_by_id/{invalid_id}')

#         # Act
#         response = property_by_id(request, invalid_id)

#         # Assert
#         assert response.status_code == status.HTTP_404_NOT_FOUND

    

#     # GET request to /buy_orders/{id} with invalid id returns empty list
#     def test_get_invalid_buy_orders(self):
#         # Arrange
#         invalid_id = 9999
#         request = RequestFactory().get(f'/buy_orders/{invalid_id}')

#         # Act
#         response = buy_orders(request, invalid_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert isinstance(response.data, list)
#         assert len(response.data) == 0

   
    

#     # GET request to /sell_orders/{id} with invalid id returns empty list
#     def test_get_sell_orders_with_invalid_id_returns_empty_list(self):
#         # Arrange
#         invalid_id = 9999
#         request = RequestFactory().get(f'/sell_orders/{invalid_id}')

#         # Act
#         response = sell_orders(request, invalid_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert isinstance(response.data, list)
#         assert len(response.data) == 0

#     # GET request to /get_user/{id} with invalid id returns 404
#     def test_get_user_with_invalid_id_returns_404(self):
#         # Arrange
#         invalid_id = 9999
#         request = RequestFactory().get(f'/get_user/{invalid_id}')
    
#         # Act
#         response = get_user(request, invalid_id)
    
#         # Assert
#         assert response.status_code == status.HTTP_404_NOT_FOUND

#     # GET request to /funds/{id} returns user funds
#     def test_get_user_funds(self):
#         # Arrange
#         user_id = 1
#         request = RequestFactory().get(f'/funds/{user_id}')

#         # Act
#         response = funds(request, user_id)

#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert 'funds' in response.data

#     # POST request to /support with valid data sends a message to support
#     def test_post_request_to_support_with_valid_data_sends_message_to_support(self):
#         # Arrange
#         request = RequestFactory().post('/support', data={'message': 'Test message'})
    
#         # Act
#         response = support(request)
    
#         # Assert
#         assert response.status_code == status.HTTP_201_CREATED
#         assert 'message' in response.data
#         assert response.data['message'] == 'Message sent successfully'

#     # PUT request to /funds/{id} adds funds to user account
#     def test_put_request_adds_funds_to_user_account(self):
#         # Arrange
#         user_id = 1
#         data = {
#             'action': 'add',
#             'amount': 100
#         }
#         request = RequestFactory().put(f'/funds/{user_id}', data=data)
    
#         # Act
#         response = funds(request, user_id)
    
#         # Assert
#         assert response.status_code == status.HTTP_200_OK
#         assert 'funds' in response.data
#         assert response.data['funds'] == 100
    