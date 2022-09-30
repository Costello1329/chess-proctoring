from rest_framework.views import APIView
from rest_framework.response import Response
from main_function.response_processing import validate_response
from main_function.response_processing import get_conflict_response
from main_function.response_processing import setup_cors_response_headers
from main_function.validate_request import validate_request
from .req_schema import req_schema
from .res_schema import res_schema
from authentication_service.models import User


class RegistrationView(APIView):
    @validate_request(req_schema)
    def post(self, request):
        username = request.data["username"]
        password_hash = request.data["password_hash"]
        try:
            User.objects.get(username=username)
            return get_conflict_response()
        except User.DoesNotExist:
            pass

        User.objects.create(username=username, password_hash=password_hash)
        return validate_response({}, res_schema)

    def options(self, request, *args, **kwargs):
        return setup_cors_response_headers(Response(status=204))
