from django.db import models

# Create your models here.


class Message(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    message = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
