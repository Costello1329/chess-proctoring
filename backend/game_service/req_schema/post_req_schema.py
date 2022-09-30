from main_function.schema_entities.username_schema import username_schema

post_req_schema = {
    "type": "object",
    "properties": {
        "white_player_username": username_schema,
        "black_player_username": username_schema
    },
    "required": ["white_player_username", "black_player_username"],
    "additionalProperties": False
}
