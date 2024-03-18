from django.contrib import admin
from .models import UserProfile, Property, Order, Support

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Property)
admin.site.register(Order)
admin.site.register(Support)
