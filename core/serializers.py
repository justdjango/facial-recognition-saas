from rest_framework import serializers


class ChangeEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()
    confirm_email = serializers.EmailField()
