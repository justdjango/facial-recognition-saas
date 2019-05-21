from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView


class FileUploadView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        return Response({"test": True}, status=HTTP_200_OK)


class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        return Response({"test": True}, status=HTTP_200_OK)
