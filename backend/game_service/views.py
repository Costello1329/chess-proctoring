from rest_framework.views import APIView
from rest_framework.response import Response
from main_function.response_processing import validate_response
from main_function.response_processing import get_reject_response
from main_function.response_processing import setup_cors_response_headers
from main_function.validate_request import validate_request
from authentication_service.models import User
from main_function.sessions_storage import get_user_id
from .req_schema.get_req_schema import get_req_schema
from .res_schema.get_res_schema import get_res_schema
from .req_schema.post_req_schema import post_req_schema
from .res_schema.post_res_schema import post_res_schema
from main_function.response_processing import get_forbidden_response
from main_function.check_request_authentication import check_request_authentication
from room_manage_service.models import Room


class GameView(APIView):
    @validate_request(get_req_schema)
    @check_request_authentication()
    def get(self, request):
        user_id = get_user_id(request.headers["Session-Id"])
        game_id = request.GET.get("game_id")

        if not game_id:
            return get_reject_response("wrong game id")

        try:
            room = Room.objects.get(id=game_id)
        except User.DoesNotExist:
            return get_forbidden_response()

        if user_id not in {str(s) for s in [room.creator_id, room.white_player_id, room.black_player_id]}:
            return get_forbidden_response()

        return validate_response({
            "white_player": User.objects.get(id=room.white_player_id).username,
            "black_player": User.objects.get(id=room.black_player_id).username,
            "fen": room.fen
        }, get_res_schema)

    @validate_request(post_req_schema)
    @check_request_authentication()
    def post(self, request):
        user_id = get_user_id(request.headers["Session-Id"])
        game_id = request.data["game_id"]
        fen = request.data["fen"]

        if not game_id:
            return get_reject_response("wrong game id")

        try:
            room = Room.objects.get(id=game_id)
        except User.DoesNotExist:
            return get_forbidden_response()

        if user_id not in {str(s) for s in [room.creator_id, room.white_player_id, room.black_player_id]}:
            return get_forbidden_response()

        room.fen = fen
        room.save()

        return validate_response({}, post_res_schema)

    def options(self, request, *args, **kwargs):
        return setup_cors_response_headers(Response(status=204))
