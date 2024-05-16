from django.conf import settings


def custom_message_levels(request):
    return {
        "NOTIFICATION_LEVEL": settings.NOTIFICATION_LEVEL,
    }
