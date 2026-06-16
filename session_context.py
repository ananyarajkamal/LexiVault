import contextvars

active_session_id = contextvars.ContextVar("active_session_id", default="default")
