from django.shortcuts import render

# Create your views here.

# yoga_api/views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Customer, MonthlyClasses
from .serializers import EnrolledUserSerializer,NewUserSerializer,FrontendInputSerializer
from django.http import HttpResponse
from django.utils import timezone
def home(request):
    return HttpResponse("Welcome to the Yoga API!")
 
class EnrollUserView(generics.CreateAPIView):
     
    def post(self, request, *args, **kwargs):
        is_new_user = request.data.get('cid', 'yes')  # Get 'isNewUser' from frontend
         
        if is_new_user == 'yes':
             
            serializer_class = NewUserSerializer(data=request.data)
            
            serializer_class.is_valid(raise_exception=True)
            
            data = serializer_class.validated_data
            print("data",data)
            age = data.get('age', 0)
            if age < 18 or age > 65:
                return Response({'error': 'Age must be between 18 and 65'}, status=status.HTTP_400_BAD_REQUEST)
            print("ok")
            
            inst=serializer_class.save()
             
            print("oki",inst,inst.cid,inst.name,inst.age )
            monthly_serializer = EnrolledUserSerializer(data={
                'batch': request.data.get('batch','none'),
                'cid': inst.cid,  # Assuming 'cid' is the existing user's ID
                'month': timezone.now().month,
                'year': timezone.now().year,
                'feestatus': True,  # Assuming the default value
            })
            monthly_serializer.is_valid(raise_exception=True)
            monthly_serializer.save()
            return Response({'success': True}, status=status.HTTP_201_CREATED)

        
        #existing user
        #serializer = EnrolledUserSerializer(data={key: value for key, value in request.data.items() if key != 'cid'})
        monthly_serializer = EnrolledUserSerializer(data={
                'batch': request.data.get('batch','none'),
                'cid': request.data.get("cid",'none'),  # Assuming 'cid' is the existing user's ID
                'month': timezone.now().month,
                'year': timezone.now().year,
                'feestatus': True,  # Assuming the default value
            })
        monthly_serializer.is_valid(raise_exception=True)
        monthly_serializer.save()
        return Response({'success': True}, status=status.HTTP_201_CREATED)

        
        
        # Perform similar validations for other criteria...

        # Save to the database
        

        