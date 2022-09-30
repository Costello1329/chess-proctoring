import uuid
import redis as redis


""""""""""""""""""""""""""""""""""""""""""""""""
"    Warning:                                  "
"    This is an inner service and should not   "
"    be used inside the handlers!              "
""""""""""""""""""""""""""""""""""""""""""""""""


class SessionIdsStorage:
    session_ids: redis.Redis

    def __init__(self):
        self.session_ids = redis.Redis(host='localhost', port=6379, db=0)

    def is_session_id_attached(self, user_id: str):
        return bool(self.session_ids.exists(str(user_id)))

    def attach_session_id(self, user_id: str, session_id):
        self.session_ids.mset({str(user_id): str(session_id)})

    def delete_session_id(self, user_id: str):
        if not self.is_session_id_attached(user_id):
            return
        self.session_ids.delete(str(user_id))

    def get_attached_session_id(self, user_id: str):
        if not self.is_session_id_attached(user_id):
            return None
        return self.session_ids.get(str(user_id)).decode("utf-8")


""""""""""""""""""""""""""""""""""""""""""""""""
"    Warning:                                  "
"    This is an inner service and should not   "
"    be used inside the handlers!              "
""""""""""""""""""""""""""""""""""""""""""""""""


class UserIdsStorage:
    user_ids: redis.Redis

    def __init__(self):
        self.user_ids = redis.Redis(host='127.0.0.1', port=6379, db=1)

    def is_user_id_attached(self, session):
        return bool(self.user_ids.exists(str(session)))

    def attach_user_id(self, session: str, user: str):
        self.user_ids.mset({str(session): str(user)})

    def detach_user_id(self, session: str):
        if not self.is_user_id_attached(session):
            return
        self.user_ids.delete(str(session))

    def get_attached_user_id(self, session):
        if not self.is_user_id_attached(session):
            return None
        return self.user_ids.get(str(session)).decode("utf-8")


def does_session_exist(session):
    users = UserIdsStorage()
    return users.is_user_id_attached(session)


def authenticate_user(user: str, allow_multiple_sessions=False):
    sessions = SessionIdsStorage()
    users = UserIdsStorage()
    session_id = str(uuid.uuid4())

    if not allow_multiple_sessions and sessions.is_session_id_attached(user):
        # If the session for this user exists, we need to delete it
        # in order logout the user from the initial session and
        # rebind him to the newly created session:
        logout_user_full(user)

    if not user_authenticated(user):
        users.attach_user_id(session_id, user)

    sessions.attach_session_id(user, session_id)
    return session_id


def user_authenticated(user_id: str):
    sessions = SessionIdsStorage()
    return sessions.is_session_id_attached(user_id)


def logout_user(session_id: str):
    sessions = SessionIdsStorage()
    users = UserIdsStorage()
    sessions.delete_session_id(users.get_attached_user_id(session_id))
    users.detach_user_id(session_id)


def logout_user_full(user_id: str):
    sessions = SessionIdsStorage()
    users = UserIdsStorage()

    while sessions.is_session_id_attached(user_id):
        users.detach_user_id(sessions.get_attached_session_id(user_id))
        sessions.delete_session_id(user_id)


def get_user_id(session_id: str):
    return UserIdsStorage().get_attached_user_id(session_id)
