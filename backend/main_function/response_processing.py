from jsonschema import validate, ValidationError
from rest_framework.response import Response


def validate_response(body, schema):
    try:
        validate(instance=body, schema=schema)
    except ValidationError:
        return get_reject_response()
    return get_success_response(body)


def setup_cors_response_headers(res):
    # TODO: put origin inside the config.
    res["Access-Control-Allow-Origin"] = "http://localhost:3000, http://127.0.0.1:3000"
    res["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    res["Access-Control-Allow-Headers"] = "Content-Type, Session-Id"
    res["Access-Control-Allow-Credentials"] = "true"
    return res


def get_empty_success_response():
    return setup_cors_response_headers(Response({}, status=200))


def get_success_response(body):
    return setup_cors_response_headers(Response(body, status=200, content_type="application/json"))


def get_error_response(status_code, body=None):
    return setup_cors_response_headers(Response(data=body, status=status_code, content_type="application/json"))


def get_reject_response(body=None):
    return get_error_response(400, body)


def get_unauthorized_response():
    return get_error_response(401)


def get_forbidden_response():
    return get_error_response(403)


def get_conflict_response():
    return get_error_response(409)


def get_internal_server_error_response():
    return get_error_response(500)
