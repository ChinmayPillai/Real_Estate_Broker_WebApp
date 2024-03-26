from django.test import TestCase
import pytest
from api.serializers import RegisterSerializer
from rest_framework import serializers  # Add this line to import the serializers module



class TestSerializers(TestCase):

    # PAN number follows the format of 5 alphabets followed by 4 numbers followed by another alphabet
    def test_pan_format_valid(self):
        serializer = RegisterSerializer()
        pan = "ABCDE1234F"
        data = {"pan": pan, "phone": "9876543210"}
        result = serializer.validate(data)
        assert result["pan"] == pan

    # PAN number has less than 10 characters
    def test_pan_length_shorter(self):
        serializer = RegisterSerializer()
        pan = "ABCDE123"
        data = {"pan": pan, "phone": "9876543210"}
        with pytest.raises(serializers.ValidationError):
            serializer.validate(data)
    
    # PAN number has more than 10 characters
    def test_pan_length_longer(self):
        serializer = RegisterSerializer()
        pan = "ABCDE12345F"
        data = {"pan": pan, "phone": "9876543210"}
        with pytest.raises(serializers.ValidationError):
            serializer.validate(data)
    
    # PAN number has alphabets in the wrong position
    def test_pan_invalid(self):
        serializer = RegisterSerializer()
        pan = "12345ABCDE"
        data = {"pan": pan, "phone": "9876543210"}
        with pytest.raises(serializers.ValidationError):
            serializer.validate(data)