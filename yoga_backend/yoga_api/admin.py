 
# Register your models here.
from django.contrib import admin
from .models import MonthlyClasses,Customer

admin.site.register(MonthlyClasses)
admin.site.register(Customer)
