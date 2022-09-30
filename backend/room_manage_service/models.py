import uuid
from django.utils import timezone
from django.db import models
from authentication_service.models import User


class Room(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_rooms')
    white_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='white_rooms')
    black_player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='black_rooms')
    created_at = models.DateTimeField(default=timezone.now)
    fen = models.TextField(default='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    result = models.TextField(default='none')

    def __str__(self):
        return "{}: {} vs {}".format(self.creator, self.white_player, self.black_player)
