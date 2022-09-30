from django.urls import path

from .views import RegistrationView

app_name = "registration_service"

urlpatterns = [
    path('', RegistrationView.as_view()),
]
