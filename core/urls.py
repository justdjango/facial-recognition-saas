from django.urls import path
from .views import (
    FileUploadView,
    ChangeEmailView
)

app_name = 'core'

urlpatterns = [
    path('demo/', FileUploadView.as_view(), name='file-upload-demo'),
    path('change-email/', ChangeEmailView.as_view(), name='change-email')
]
