from main_function.schema_entities.guid_schema import guid_schema

post_res_schema = {
    "type": "object",
    "properties": {
        "session_id": guid_schema
    },
    "required": ["session_id"],
    "additionalProperties": False,
}
