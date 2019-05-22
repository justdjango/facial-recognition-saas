from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import File


class ChangeEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    confirm_email = serializers.EmailField()


class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(style={'input_type': 'password'})
    confirm_password = serializers.CharField(style={'input_type': 'password'})
    current_password = serializers.CharField(style={'input_type': 'password'})


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ('pk', 'key')


class SubscribeSerializer(serializers.Serializer):
    stripeToken = serializers.CharField(max_length=60)
