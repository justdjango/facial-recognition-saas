from django.urls import path
from .views import (
    FileUploadView,
    ChangeEmailView,
    UserEmailView
)

app_name = 'core'

urlpatterns = [
    path('demo/', FileUploadView.as_view(), name='file-upload-demo'),
    path('email/', UserEmailView.as_view(), name='email'),
    path('change-email/', ChangeEmailView.as_view(), name='change-email')
]
