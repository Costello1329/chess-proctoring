from django.urls import path

from .views import GameView

app_name = "game_service"

urlpatterns = [
    path('', GameView.as_view()),
]
