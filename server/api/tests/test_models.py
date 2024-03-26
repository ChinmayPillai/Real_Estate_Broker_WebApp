from django.test import TestCase
from api.models import UserProfile, Property, Order, Support

class TestModels(TestCase):
    
    # Create a new user profile with all required fields
    def test_create_user_profile_with_all_required_fields(self):
        user = UserProfile.objects.create(username="jdoe", name="John Doe", email="johndoe@example.com")
        assert user.name == "John Doe"
        assert user.email == "johndoe@example.com"
        assert user.phone == "9876543210"
        assert user.funds == 0
        assert user.money_invested == 0
        assert user.pnl == 0
        assert user.portfolio == []
        assert user.watchlist == []
        assert user.pan == "ABCDE1234F"