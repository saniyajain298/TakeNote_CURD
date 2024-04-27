from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
    RetrieveAPIView,
)

# Create your views here.
from rest_framework.response import Response

from .models import Notes
from .serializers import NoteSerializer, RetrieveNoteSerializer
from utilities.utils import (
    ResponseInfo,
)

class CreateNoteAPIView(CreateAPIView):

    serializer_class = NoteSerializer

    def __init__(self, **kwargs):
        self.status_code = status.HTTP_200_OK
        self.response_format = ResponseInfo().response
        super(CreateNoteAPIView, self).__init__(**kwargs)

    def post(self, request, *args, **kwargs):
        data = request.data
        notes_serializer = self.get_serializer(data=data)

        if notes_serializer.is_valid(raise_exception=True):
            note = notes_serializer.save()
            serialized_note = NoteSerializer(note).data

            self.response_format["data"] = serialized_note
            self.response_format["error"] = None
            self.response_format["status_code"] = self.status_code = status.HTTP_200_OK
            self.response_format["message"] = "Note created successfully"

            return Response(self.response_format, status=self.status_code)


class ListNoteAPIView(ListAPIView):

    serializer_class = RetrieveNoteSerializer

    def __init__(self, **kwargs):
        self.status_code = status.HTTP_200_OK
        self.response_format = ResponseInfo().response
        super(ListNoteAPIView, self).__init__(**kwargs)

    def get_queryset(self):
        return Notes.objects.all()

    def get(self, request, *args, **kwargs):
        try:
            data = super().list(request, *args, **kwargs)

            self.response_format["data"] = data.data
            self.response_format["error"] = None
            self.response_format["status_code"] = self.status_code = status.HTTP_200_OK
            self.response_format["message"] = "Success"
        except Notes.DoesNotExist:
            self.response_format["data"] = None
            self.response_format["error"] = "List notes"
            self.response_format["status_code"] = self.status_code = status.HTTP_400_BAD_REQUEST
            self.response_format["message"] = "Failure"
        return Response(self.response_format, status=self.status_code)


class UpdateNoteAPIView(UpdateAPIView):
    """
    Class for creating api for updating chapter.
    """
    serializer_class = NoteSerializer

    def __init__(self, **kwargs):
        """
         Constructor function for formatting the web response to return.
        """
        self.status_code = status.HTTP_200_OK
        self.response_format = ResponseInfo().response
        super(UpdateNoteAPIView, self).__init__(**kwargs)

    def get_queryset(self):
        """
        Method to get queryset for chapter.
        """
        return Notes.objects.get(id=self.kwargs["pk"])

    def patch(self, request, *args, **kwargs):
        """
        PATCH Method for saving new chapter.
        """
        try:

            note = self.get_queryset()
            note_serializer = self.get_serializer(note, data=request.data, partial=True)
            if note_serializer.is_valid(raise_exception=True):
                self.perform_update(note_serializer)

            self.response_format["data"] = note_serializer.data
            self.response_format["error"] = None
            self.response_format["status_code"] = self.status_code = status.HTTP_200_OK
            self.response_format["message"] = "Note updated successfully"
        except Notes.DoesNotExist:
            self.response_format["data"] = None
            self.response_format["error"] = "Note update"
            self.response_format["status_code"] = self.status_code = status.HTTP_400_BAD_REQUEST
            self.response_format["message"] = "Failure"
        return Response(self.response_format, status=self.status_code)


class DeleteNoteAPIView(DestroyAPIView):
    """
    Class for creating api for delete chapter.
    """
    serializer_class = NoteSerializer

    def __init__(self, **kwargs):
        """
         Constructor function for formatting the web response to return.
        """
        self.status_code = status.HTTP_200_OK
        self.response_format = ResponseInfo().response
        super(DeleteNoteAPIView, self).__init__(**kwargs)

    def get_queryset(self):
        """
        Method to get queryset for chapter.
        """
        return Notes.objects.get(id=self.kwargs["pk"])

    def delete(self, request, *args, **kwargs):
        """
        DELETE Method for delete chapter.
        """
        try:
            note = self.get_queryset()
            note.delete()
            self.response_format["data"] = None
            self.response_format["error"] = None
            self.response_format["status_code"] = self.status_code = status.HTTP_200_OK
            self.response_format["message"] = "Note deleted successfully"
        except Notes.DoesNotExist:
            self.response_format["data"] = None
            self.response_format["error"] = "Note delete"
            self.response_format["status_code"] = self.status_code = status.HTTP_400_BAD_REQUEST
            self.response_format["message"] = "Failure"
        return Response(self.response_format, status=self.status_code)


class GetNoteAPIView(RetrieveAPIView):
    """
    Class for creating api for getting course.
    """
    serializer_class = RetrieveNoteSerializer

    def __init__(self, **kwargs):
        """
         Constructor function for formatting the web response to return.
        """
        self.status_code = status.HTTP_200_OK
        self.response_format = ResponseInfo().response
        super(GetNoteAPIView, self).__init__(**kwargs)

    def get_queryset(self):
        """
        Method to get queryset for course.
        """
        return Notes.objects.get(id=self.kwargs["pk"])

    def get(self, request, *args, **kwargs):
        """
        GET Method for saving new course.
        """
        try:
            note = self.get_queryset()
            course_serializer = self.get_serializer(note, many=False)

            self.response_format["data"] = course_serializer.data
            self.response_format["error"] = None
            self.response_format["status_code"] = self.status_code = status.HTTP_200_OK
            self.response_format["message"] = "Successfully received note"
        except Notes.DoesNotExist:
            self.response_format["data"] = None
            self.response_format["error"] = "Get Note"
            self.response_format["status_code"] = self.status_code = status.HTTP_400_BAD_REQUEST
            self.response_format["message"] = "Failure"
        return Response(self.response_format, status=self.status_code)

