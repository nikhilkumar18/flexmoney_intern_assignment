# yoga_api/serializers.py

from rest_framework import serializers
from .models import Customer, MonthlyClasses
from django.utils import timezone

class FrontendInputSerializer(serializers.Serializer):
    name = serializers.CharField()
    age = serializers.IntegerField()
    batch = serializers.CharField()

class EnrolledUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyClasses
        fields = ['cid','month','year','batch','feestatus']  # Include 'cid' in the serializer


    

class NewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        #exclude=['cid']
        fields = ['name','age']  # Include 'cid' in the serializer
