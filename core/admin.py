from django.contrib import admin

from .models import User, Membership, Payment, File

admin.site.register(User)
admin.site.register(Membership)
admin.site.register(Payment)
admin.site.register(File)
