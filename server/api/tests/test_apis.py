import json
from django.test import RequestFactory, TestCase
from api.models import UserProfile, Property, Order, Support
from rest_framework import status
from api.views import register, login, marketOrder, limitOrder, property, property_by_id, buy_orders, sell_orders, funds, watchlist, portfolio, get_user, support
from api.serializers import PropertySerializer

    
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

