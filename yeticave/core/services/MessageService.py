from django.conf import settings
from django.contrib import messages
from django.http import HttpRequest


class MessageService:
    @staticmethod
    def add_message(request: HttpRequest, message_test: str):
        messages.add_message(
            request,
            settings.NOTIFICATION_LEVEL,
            message_test.capitalize(),
        )
