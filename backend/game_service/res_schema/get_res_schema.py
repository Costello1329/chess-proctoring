from main_function.schema_entities.username_schema import username_schema

get_res_schema = {
    "type": "object",
    "properties": {
        "fen": {"type": "string"},
        "white_player": username_schema,
        "black_player": username_schema
    },
    "required": ["fen", "white_player", "black_player"],
    "additionalProperties": False
}
