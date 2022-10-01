from rest_framework.views import APIView
from rest_framework.response import Response
from main_function.response_processing import validate_response
from main_function.response_processing import get_reject_response
from main_function.response_processing import setup_cors_response_headers
from main_function.validate_request import validate_request
from authentication_service.models import User
from .models import Room
from main_function.sessions_storage import get_user_id
from .req_schema.post_req_schema import post_req_schema
from .req_schema.get_req_schema import get_req_schema
from .res_schema.post_res_schema import post_res_schema
from .res_schema.get_res_schema import get_res_schema
from main_function.response_processing import get_conflict_response
from main_function.response_processing import get_internal_server_error_response
from main_function.check_request_authentication import check_request_authentication


class RoomManageView(APIView):
    @validate_request(get_req_schema)
    @check_request_authentication()
    def get(self, request):
        user_id = get_user_id(request.headers["Session-Id"])
        relation = request.GET.get("relation", "participant")

        if relation == "creator":
            rooms = Room.objects.filter(creator_id=user_id).all()
        elif relation == "participant":
            rooms = Room.objects.filter(white_player_id=user_id).all() |\
                    Room.objects.filter(black_player_id=user_id).all()
        else:
            return get_internal_server_error_response()

        rooms = rooms.order_by('created_at')

        body = {
            "rooms": [{
                "room_id": str(room.id),
                "creator": User.objects.get(id=room.creator_id).username,
                "white_player": User.objects.get(id=room.white_player_id).username,
                "black_player": User.objects.get(id=room.black_player_id).username,
                "created_at": str(room.created_at),
                "result": room.result
            } for room in rooms]
        }
        return validate_response(body, get_res_schema)

    @validate_request(post_req_schema)
    @check_request_authentication()
    def post(self, request):
        creator = User.objects.get(id=get_user_id(request.headers["Session-Id"]))
        white_player_username = request.data["white_player_username"]
        black_player_username = request.data["black_player_username"]

        try:
            white_player = User.objects.get(username=white_player_username)
            black_player = User.objects.get(username=black_player_username)

            if white_player.id == black_player.id:
                return get_conflict_response()

            room_id = Room.objects.create(creator=creator, white_player=white_player, black_player=black_player).id
            return validate_response({"room_id": str(room_id)}, post_res_schema)
        except User.DoesNotExist:
            return get_reject_response("no such user found")

    def options(self, request, *args, **kwargs):
        return setup_cors_response_headers(Response(status=204))
