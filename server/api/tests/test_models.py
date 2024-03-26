from django.test import TestCase
from api.models import UserProfile, Property, Order, Support

class TestModels(TestCase):
    
    # Create a new user profile with all required fields
    def test_create_user_profile_with_all_required_fields(self):
        user = UserProfile.objects.create(username="jd", password="123", name="John Doe", email="johndoe@example.com")
        assert user.username == "jd"
        assert user.name == "John Doe"
        assert user.email == "johndoe@example.com"
        assert user.phone == "9876543210"
        assert user.funds == 0
        assert user.money_invested == 0
        assert user.pnl == 0
        assert user.portfolio == []
        assert user.watchlist == []
        assert user.pan == "ABCDE1234F"

    
    # Property object can be created with all fields filled
    def test_property_creation_with_all_fields_filled(self):
        property = Property(name="Test Property", category="Test Category", description="Test Description", image="Test Image", location="Test Location", ltp=100.00)
        assert property.name == "Test Property"
        assert property.category == "Test Category"
        assert property.description == "Test Description"
        assert property.image == "Test Image"
        assert property.location == "Test Location"
        assert property.ltp == 100.00