# yoga_api/models.py

from django.db import models

class Customer(models.Model):
    cid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    age = models.IntegerField()

class MonthlyClasses(models.Model):
    cid = models.ForeignKey(Customer, on_delete=models.CASCADE)
    month = models.IntegerField()
    year = models.IntegerField()
    batch = models.CharField(max_length=20)
    feestatus = models.BooleanField(default=False)  # False: Unpaid, True: Paid

    class Meta:
        unique_together = ('cid', 'month', 'year')
