from rest_framework import serializers
from .models import Notes


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ("title", "content", "updated_at", "created_at")

class RetrieveNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notes
        fields = ("id", "title", "content", "updated_at", "created_at")



