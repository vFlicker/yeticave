from django.conf import settings
from django.contrib import messages
from django.http import HttpRequest


class MessageTemplates:
    @staticmethod
    def added_to_watchlist(name: str, title: str) -> str:
        return f"{name} {title} added to watchlist."


class MessageService:
    @staticmethod
    def add_message(request: HttpRequest, message_test: str):
        messages.add_message(
            request,
            settings.NOTIFICATION_LEVEL,
            message_test.capitalize(),
        )
