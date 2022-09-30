from rest_framework.views import APIView
from rest_framework.response import Response
from main_function.response_processing import validate_response
from main_function.response_processing import setup_cors_response_headers
from main_function.validate_request import validate_request
from .models import User
from main_function.sessions_storage import get_user_id
from .req_schema.get_req_schema import get_req_schema
from .res_schema.get_res_schema import get_res_schema
from .req_schema.post_req_schema import post_req_schema
from .res_schema.post_res_schema import post_res_schema
from .req_schema.delete_req_schema import delete_req_schema
from .res_schema.delete_res_schema import delete_res_schema
from main_function.response_processing import get_unauthorized_response
from main_function.sessions_storage import authenticate_user
from main_function.check_request_authentication import check_request_authentication
from main_function.sessions_storage import logout_user


class AuthenticationView(APIView):
    @validate_request(get_req_schema)
    @check_request_authentication()
    def get(self, request):
        try:
            user = User.objects.get(id=get_user_id(request.headers["Session-Id"]))
        except User.DoesNotExist:
            return get_unauthorized_response()

        body = {
            "username": user.username,
            "id": str(user.id)
        }

        return validate_response(body, get_res_schema)

    @validate_request(post_req_schema)
    def post(self, request):
        username = request.data["username"]
        password_hash = request.data["password_hash"]
        try:
            user = User.objects.get(username=username)

            if user.password_hash != password_hash:
                return get_unauthorized_response()

            session = authenticate_user(user.id)
            return validate_response({"session_id": session}, post_res_schema)
        except User.DoesNotExist:
            return get_unauthorized_response()

    def options(self, request, *args, **kwargs):
        return setup_cors_response_headers(Response(status=204))

    @validate_request(delete_req_schema)
    @check_request_authentication()
    def delete(self, request):
        logout_user(request.headers['Session-Id'])
        return validate_response({}, delete_res_schema)

