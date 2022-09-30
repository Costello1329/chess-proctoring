from main_function.schema_entities.guid_schema import guid_schema

post_res_schema = {
    "type": "object",
    "properties": {
        "room_id": guid_schema
    },
    "required": ["room_id"],
    "additionalProperties": False
}
