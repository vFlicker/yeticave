from django.contrib import admin, auth

User = auth.get_user_model()

admin.site.register(User)
