from django.shortcuts import render
from django.views.decorators.http import require_POST, require_GET
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from .models import preferences



# Create your views here.

'''
@route:  GET api/fetchLockedKeys/
@desc:   Fetches all the locked keys for the user
@body:   None
@access: Private
'''

@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetchLockedKeys(request):
    print("Fetching locked keys")
    user = request.user

    #fetch the user preferences from db
    
    pref, created = preferences.objects.get_or_create(user=user)

    if created:
        pref.lockedKeys = ""
        pref.save()
        return Response({"lockedKeys": ""}, status=status.HTTP_200_OK)
    
    lockedKeys = pref.lockedKeys

    return Response({"lockedKeys": lockedKeys}, status=status.HTTP_200_OK)


'''
@route:  POST api/addLockedKey/
@desc:   Adds a locked key for the user
@body:   a single char in locked_key to add
@access: Private
'''

@api_view(['POST'])
@require_POST   
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def addLockedKey(request):

    user = request.user

    aKey = request.data['locked_key']

    if len(aKey) != 1:
        return Response({"detail": "a valid key is required"}, status=status.HTTP_400_BAD_REQUEST)

    aKey = aKey.lower()

    pref, created = preferences.objects.get_or_create(user=user)

    if aKey in pref.lockedKeys:
        return Response({"detail": "Key already exists"}, status=status.HTTP_400_BAD_REQUEST)

    pref.lockedKeys.append(aKey)
    pref.save()

    return Response({"detail": "Key added." }, status=status.HTTP_200_OK)

'''
@route:  POST api/removeLockedKey/
@desc:   Removes a locked key for the user
@body:   a single char in locked_key to remove
@access: Private
'''

@api_view(['POST'])
@require_POST   
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def removeLockedKey(request):

    user = request.user

    aKey = request.data['locked_key']

    if len(aKey) != 1:
        return Response({"detail": "a valid key is required"}, status=status.HTTP_400_BAD_REQUEST)

    aKey = aKey.lower()

    pref, created = preferences.objects.get_or_create(user=user)

    if aKey not in pref.lockedKeys:
        return Response({"detail": "Key does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    pref.lockedKeys.remove(aKey)
    pref.save()

    return Response({"detail": "Key removed." }, status=status.HTTP_200_OK)






