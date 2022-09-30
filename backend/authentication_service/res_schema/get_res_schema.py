from main_function.schema_entities.username_schema import username_schema
from main_function.schema_entities.guid_schema import guid_schema

get_res_schema = {
    "type": "object",
    "properties": {
        "username": username_schema,
        "id": guid_schema,
    },
    "required": ["username", "id"],
    "additionalProperties": False
}
