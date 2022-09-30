from django.urls import path

from .views import RoomManageView

app_name = "room_manage_service"

urlpatterns = [
    path('', RoomManageView.as_view()),
]
