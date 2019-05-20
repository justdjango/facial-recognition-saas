from django.urls import path
from .views import FileUploadView

app_name = 'core'

urlpatterns = [
    path('demo/', FileUploadView.as_view(), name='file-upload-demo')
]
