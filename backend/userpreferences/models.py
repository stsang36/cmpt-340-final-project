from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class preferences(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    lockedKeys = models.JSONField(default="")
    frequent_used_words = models.JSONField(default="")





    
    


