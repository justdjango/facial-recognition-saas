from django.urls import path
from .views import (
    FileUploadView,
    ChangeEmailView,
    UserEmailView,
    ChangePasswordView,
    UserDetailsView,
    SubscribeView,
    ImageRecognitionView
)

app_name = 'core'

urlpatterns = [
    path('demo/', FileUploadView.as_view(), name='file-upload-demo'),
    path('email/', UserEmailView.as_view(), name='email'),
    path('change-email/', ChangeEmailView.as_view(), name='change-email'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('billing/', UserDetailsView.as_view(), name='billing'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('upload/', ImageRecognitionView.as_view(), name='image-recognition')
]
