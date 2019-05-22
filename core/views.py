import datetime
from django.shortcuts import render
from django.contrib.auth import get_user_model, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from .image_detection import detect_faces
from .models import TrackedRequest
from .permissions import IsMember
from .serializers import (
    ChangeEmailSerializer,
    ChangePasswordSerializer,
    FileSerializer
)

User = get_user_model()


def get_user_from_token(request):
    key = request.META.get("HTTP_AUTHORIZATION").split(' ')[1]
    token = Token.objects.get(key=key)
    user = User.objects.get(id=token.user_id)
    return user


class FileUploadView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):

        content_length = request.META.get('CONTENT_LENGTH')  # bytes
        if int(content_length) > 5000000:
            return Response({"message": "Image size is greater than 5MB"}, status=HTTP_400_BAD_REQUEST)

        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            image_path = file_serializer.data.get('file')
            recognition = detect_faces(image_path)
        return Response(recognition, status=HTTP_200_OK)


class UserEmailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        obj = {'email': user.email}
        return Response(obj)


class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        email_serializer = ChangeEmailSerializer(data=request.data)
        if email_serializer.is_valid():
            print(email_serializer.data)
            email = email_serializer.data.get('email')
            confirm_email = email_serializer.data.get('confirm_email')
            if email == confirm_email:
                user.email = email
                user.save()
                return Response({"email": email}, status=HTTP_200_OK)
            return Response({"message": "The emails did not match"}, status=HTTP_400_BAD_REQUEST)
        return Response({"message": "Did not receive the correct data"}, status=HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        password_serializer = ChangePasswordSerializer(data=request.data)
        if password_serializer.is_valid():
            password = password_serializer.data.get('password')
            confirm_password = password_serializer.data.get('confirm_password')
            current_password = password_serializer.data.get('current_password')
            auth_user = authenticate(
                username=user.username,
                password=current_password
            )
            if auth_user is not None:
                if password == confirm_password:
                    auth_user.set_password(password)
                    auth_user.save()
                    return Response(status=HTTP_200_OK)
                else:
                    return Response({"message": "The passwords did not match"}, status=HTTP_400_BAD_REQUEST)
            return Response({"message": "Incorrect user details"}, status=HTTP_400_BAD_REQUEST)
        return Response({"message": "Did not receive the correct data"}, status=HTTP_400_BAD_REQUEST)


class UserDetailsView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        membership = user.membership
        today = datetime.datetime.now()
        month_start = datetime.date(today.year, today.month, 1)
        tracked_request_count = TrackedRequest.objects \
            .filter(user=user, timestamp__gte=month_start) \
            .count()
        obj = {
            'membershipType': membership.get_type_display(),
            'free_trial_end_date': membership.end_date,
            'api_request_count': tracked_request_count
        }
        return Response(obj)


class SubscribeView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        # update the user membership
        return Response({
            'test': True
        })


class ImageRecognitionView(APIView):
    permission_classes = (IsMember, )

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        file_serializer = FileSerializer(data=request.data)

        # keep track of the requests a user makes
        tracked_request = TrackedRequest()
        tracked_request.user = user
        tracked_request.endpoint = '/api/image-recognition/'
        tracked_request.save()

        content_length = request.META.get('CONTENT_LENGTH')  # bytes
        if int(content_length) > 5000000:
            return Response({"message": "Image size is greater than 5MB"}, status=HTTP_400_BAD_REQUEST)

        if file_serializer.is_valid():
            file_serializer.save()
            image_path = file_serializer.data.get('file')
            recognition = detect_faces(image_path)
            return Response(recognition, status=HTTP_200_OK)
        return Response({"Received incorrect data"}, status=HTTP_400_BAD_REQUEST)
