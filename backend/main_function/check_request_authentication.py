from .sessions_storage import does_session_exist
from .response_processing import get_unauthorized_response
from .sessions_storage import get_user_id
from .sessions_storage import logout_user_full
from authentication_service.models import User


def check_request_authentication():
    def request_dec(func):
        def request_handler(self, request):
            if "Session-Id" not in request.headers:
                return get_unauthorized_response()

            else:
                session_id = request.headers["Session-Id"]
                user_id = get_user_id(session_id)

                if user_id is None:
                    return get_unauthorized_response()

                try:
                    User.objects.get(id=user_id)
                except User.DoesNotExist:
                    logout_user_full(user_id)
                    return get_unauthorized_response()

                return get_unauthorized_response() \
                    if not does_session_exist(session_id) \
                    else func(self, request)
        return request_handler
    return request_dec
