# yoga_api/urls.py

from django.urls import path
from .views import EnrollUserView
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('enroll/', EnrollUserView.as_view(), name='enroll-user'),
]
