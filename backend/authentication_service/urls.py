from django.urls import path

from .views import AuthenticationView

app_name = "authentication_service"

urlpatterns = [
    path('', AuthenticationView.as_view()),
]
