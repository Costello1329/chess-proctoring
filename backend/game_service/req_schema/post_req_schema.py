from main_function.schema_entities.guid_schema import guid_schema

post_req_schema = {
    "type": "object",
    "properties": {
        "game_id": guid_schema,
        "fen": {"type": "string"}
    },
    "required": ["game_id", "fen"],
    "additionalProperties": False
}
