from django.shortcuts import render
from rest_framework import generics
from .models import Note
from .serializers import NoteSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q


class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    

class NoteRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
@api_view(['GET'])
def search_notes(request):
    query = request.query_params.get('search')
    notes = Note.objects.filter(Q(title__icontains=query) | Q(body__icontains=query) | Q(category__icontains=query))
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)
