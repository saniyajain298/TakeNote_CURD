from django.urls import path

from .views import (
    CreateNoteAPIView,
    ListNoteAPIView,
    UpdateNoteAPIView,
    GetNoteAPIView,
    DeleteNoteAPIView
)

urlpatterns = [
    path('createNote', CreateNoteAPIView.as_view(), name="create-note"),
    path('viewNote/<int:pk>', GetNoteAPIView.as_view(), name="create-note"),
    path('getNotesList', ListNoteAPIView.as_view(), name="list-notes"),
    path('updateNote/<int:pk>', UpdateNoteAPIView.as_view(), name="update-note"),
    path('deleteNote/<int:pk>', DeleteNoteAPIView.as_view(), name="create-note"),
]
