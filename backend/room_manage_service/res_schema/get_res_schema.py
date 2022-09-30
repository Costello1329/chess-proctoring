from main_function.schema_entities.username_schema import username_schema
from main_function.schema_entities.guid_schema import guid_schema

get_res_schema = {
    "type": "object",
    "properties": {
        "rooms": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "room_id": guid_schema,
                    "creator": username_schema,
                    "white_player": username_schema,
                    "black_player": username_schema,
                    "created_at": {
                        "type": "string"
                    },
                    "result": {
                        "enum": ["none", "win", "lose", "draw"]
                    }
                },
                "required": ["room_id", "creator", "white_player", "black_player", "created_at"],
                "additionalProperties": False
            }
        }
    },
    "required": ["rooms"],
    "additionalProperties": False
}
