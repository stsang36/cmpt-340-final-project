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
    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    if created:
        try:
            pref.lockedKeys = ""
            pref.save()
        except:
            return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)
        
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

    try: 
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

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

    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)
    

    if aKey not in pref.lockedKeys:
        return Response({"detail": "Key does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        pref.lockedKeys.remove(aKey)
        pref.save()
    except:
        return Response({"detail": "Error removing key"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail": "Key removed." }, status=status.HTTP_200_OK)

'''
@route:  POST api/updateContrast/
@desc:   Updates the contrast preference for the user
@body:   provides a boolean value for high_contrast
@access: Private
'''

@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateContrast(request):

    user = request.user
    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    selection = int(request.data['high_contrast'])

    if pref.color_blind and selection == 1:
        return Response({"detail": "Cannot enable high contrast with colorblind mode enabled." }, status=status.HTTP_400_BAD_REQUEST)

    if selection == 1:
        pref.high_contrast = True
    else:
        pref.high_contrast = False

    try:
        pref.save()
    except:
        return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail": "Contrast preference updated." }, status=status.HTTP_200_OK)

'''
@route:  POST api/updateColorBlind/
@desc:   Updates the colorblind preference for the user
@body:   provides a boolean value for color_blind
@access: Private
'''

@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateColorBlind(request):

    user = request.user

    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)
    

    selection = int(request.data['color_blind'])

    if pref.high_contrast and selection == 1:
        return Response({"detail": "Cannot enable colorblind mode with high contrast enabled." }, status=status.HTTP_400_BAD_REQUEST)

    if selection == 1:
        pref.color_blind = True
    else:
        pref.color_blind = False
    
    try:
        pref.save()
    except:
        return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)
    

    return Response({"detail": "Colorblind preference updated." }, status=status.HTTP_200_OK)


'''
@route:  GET api/fetchFrequentWords/
@desc:   Fetches all the frequent words for the user
@body:   None
@access: Private
'''

@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetchFrequentWords(request):
    user = request.user

    #fetch the user preferences from db
    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    if created:

        try:
            pref.frequent_used_words = ""
            pref.save()
        except:
            return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"frequentWords": ""}, status=status.HTTP_200_OK)
    
    frequentWords = pref.frequent_used_words

    return Response({"frequentWords": frequentWords}, status=status.HTTP_200_OK)

'''
@route:  POST api/updateFrequentWords/
@desc:   Adds a frequent word for the user
@body:   a single word in frequent_word to add
@access: Private
'''

@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateFrequentWords(request):

    user = request.user

    aWord = request.data['frequent_words']
    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    if aWord not in pref.frequent_used_words:
        pref.frequent_used_words[aWord] = 1

        try:
            pref.save()
        except:
            return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Word added." }, status=status.HTTP_200_OK)

    pref.frequent_used_words[aWord] += 1

    try: 
        pref.save()
    except:
        return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail": "Word updated." }, status=status.HTTP_200_OK)

'''
@route:  POST api/clearFrequentWords/
@desc:   Clears all the frequent words for the user
@body:   None
@access: Private
'''

@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def clearFrequentWords(request):
    user = request.user

    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)
    
    pref.frequent_used_words = dict()

    try:
        pref.save()
    except:
        return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail": "Frequent words cleared." }, status=status.HTTP_200_OK)

'''
@route:  GET api/getPreferences/
@desc:   Fetches all the preferences for the user
@body:   None
@access: Private
'''
@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetchAllUserPreferences(request):
    user = request.user

    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    if created:
        return Response({"detail": "No preferences found for this user." }, status=status.HTTP_400_BAD_REQUEST)

    all_pref = {}

    for field in preferences._meta.fields:
        all_pref[field.name] = field.value_to_string(pref)

    
    return Response(all_pref, status=status.HTTP_200_OK)


'''
@route:  POST api/resetAllUserPreferences/
@desc:   Resets all the preferences for the user
@body:   None
@access: Private
'''
@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])

def resetAllUserPreferences(request):
    user = request.user

    try:
        preferences.objects.filter(user=user).delete()
    except:
        return Response({"detail": "Error resetting user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    if not preferences.objects.filter(user=user).exists():

        try:
            created = preferences.objects.create(user=user)
        except:
            return Response({"detail": "Error creating user preferences"}, status=status.HTTP_400_BAD_REQUEST)

        if created:
            return Response({"detail": "Preferences reset." }, status=status.HTTP_200_OK)

    return Response({"detail": "Cannot Reset Preferences" }, status=status.HTTP_400_BAD_REQUEST)


'''
@route:  POST api/updateShortcutKeys/
@desc:   Updates the shortcut keys for the user
@body:   a list of shortcut keys
@access: Private
'''
@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateShortcutKeys(request):
    user = request.user

    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except: 
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    pref.shortcut_keys = request.data['shortcut_keys']
    try:
        pref.save()
    except:
        return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail": "Shortcut keys updated." }, status=status.HTTP_200_OK)

'''
@route:  GET api/fetchShortcutKeys/
@desc:   Fetches all the shortcut keys for the user
@body:   None
@access: Private
'''
@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def fetchShortcutKeys(request):
    user = request.user

    try:
        pref, created = preferences.objects.get_or_create(user=user)

    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)
    
    if created:
        try:
            pref.shortcut_keys = ""
            pref.save()
        except:
            return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({"shortcut_keys": ""}, status=status.HTTP_200_OK)
    

    return Response({"shortcut_keys": pref.shortcut_keys}, status=status.HTTP_200_OK)


'''
@route:  POST api/clearShortcutKeys/
@desc:   Clears all the shortcut keys for the user
@body:   None
@access: Private
'''
@api_view(['POST'])
@require_POST
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def clearShortcutKeys(request):
    user = request.user

    try:
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)
    

    pref.shortcut_keys = list()
    
    try:
        pref.save()
    except:
        return Response({"detail": "Error saving user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"detail": "Shortcut keys cleared." }, status=status.HTTP_200_OK)


