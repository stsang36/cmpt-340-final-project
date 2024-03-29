from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import textfield
from django.utils import timezone

# Create your views here.

'''
@route:  GET api/loadText/
@desc:   Fetches the text for the user
@body:   None
@access: Private
'''

@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])

def loadText(request):

    user = request.user

    try:
        returnedData = textfield.objects.get(user=user)
    except:
        return Response({"detail": "Error fetching text"}, status=status.HTTP_400_BAD_REQUEST)

    if not returnedData:
        return Response({"detail": "Nothing was saved."}, status=status.HTTP_400_BAD_REQUEST)
    
    text = returnedData.text
    date = returnedData.date

    return Response({"date": date, "text": text}, status=status.HTTP_200_OK)

'''
@route:  POST api/saveText/
@desc:   Saves the text for the user
@body:   text to save
@access: Private
'''

@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])

def saveText(request):
    
        user = request.user
        text = request.data['text']

        try:
            textData, created = textfield.objects.get_or_create(user=user)
            textData.text = text
            textData.date = timezone.now()
            textData.save()
        except:
            return Response({"detail": "Error saving text"}, status=status.HTTP_400_BAD_REQUEST)
    
        return Response({"detail": "Text saved successfully"}, status=status.HTTP_200_OK)


'''
@route:  POST api/clearText/
@desc:   Clears the text for the user
@body:   None
@access: Private
'''

@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])

def clearText(request):
    user = request.user

    if not textfield.objects.filter(user=user):
        return Response({"detail": "Nothing to clear."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        textfield.objects.filter(user=user).delete()

        if textfield.objects.filter(user=user):
            return Response({"detail": "Error clearing text"}, status=status.HTTP_400_BAD_REQUEST)
    
    except:
        return Response({"detail": "Error clearing text"}, status=status.HTTP_400_BAD_REQUEST)
    

    return Response({"detail": "Text cleared successfully"}, status=status.HTTP_200_OK)




