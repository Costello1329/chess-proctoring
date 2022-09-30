from main_function.schema_entities.username_schema import username_schema
from main_function.schema_entities.password_hash_schema import password_hash_schema

req_schema = {
    "type": "object",
    "properties": {
        "username": username_schema,
        "password_hash": password_hash_schema
    },
    "required": ["username", "password_hash"],
    "additionalProperties": False
}
