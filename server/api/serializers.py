from rest_framework import serializers
from .models import Property, UserProfile, Order
from django.contrib.auth.hashers import make_password





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

class RegisterSerializer(serializers.ModelSerializer):
     
    def create(self, validated_data):
        # Hash the password before saving the user
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
     
    class Meta:
        model = UserProfile
        fields = ['name', 'username', 'email', 'phone', 'pan', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'username': {'required': True},
            'name': {'required': True},  
            'pan': {'required': True},
            'phone': {'required': True}

        }

    def validate_pan(self, value):
        """
        Validator function to ensure PAN card number follows the format of 5 alphabets followed by 4 numbers
        followed by another alphabet.
        """
        if not value[:5].isalpha() or not value[5:9].isdigit() or not value[9].isalpha():
            raise serializers.ValidationError('PAN number must be valid')
        return value
    
    def validate_phone(self, value):
        """
        Validator function to ensure phone number consists of exactly 10 digits.
        """
        if len(value) != 10 or not value.isdigit():
            raise serializers.ValidationError('Phone number invalid')
        return value
     
    def validate(self, data):
        
        phone = data.get('phone')
        if phone:
            self.validate_phone(phone)

        pan = data.get('pan')
        if pan:
            self.validate_pan(pan)

        return data


class RegisterSerializer(serializers.ModelSerializer):
     
    def create(self, validated_data):
        # Hash the password before saving the user
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
     
    class Meta:
        model = UserProfile
        fields = ['name', 'username', 'email', 'phone', 'pan', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'username': {'required': True},
            'name': {'required': True},  
            'pan': {'required': True},
            'phone': {'required': True}

        }

    def validate_pan(self, value):
        """
        Validator function to ensure PAN card number follows the format of 5 alphabets followed by 4 numbers
        followed by another alphabet.
        """
        if not value[:5].isalpha() or not value[5:9].isdigit() or not value[9].isalpha():
            raise serializers.ValidationError('PAN number must be valid')
        return value
    
    def validate_phone(self, value):
        """
        Validator function to ensure phone number consists of exactly 10 digits.
        """
        if len(value) != 10 or not value.isdigit():
            raise serializers.ValidationError('Phone number invalid')
        return value
     
    def validate(self, data):
        
        phone = data.get('phone')
        if phone:
            self.validate_phone(phone)

        pan = data.get('pan')
        if pan:
            self.validate_pan(pan)

        return data