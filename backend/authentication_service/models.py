import uuid

from django.db import models


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=25)
    password_hash = models.CharField(max_length=32)

    def __str__(self):
        return self.username
