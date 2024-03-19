from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.authtoken.models import Token
from authentication.serializers import UserSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view


'''
@route:  POST login/
@desc:   Login user
@body:   Object with username and password
@access: PUBLIC
'''
@csrf_exempt
@require_POST
@api_view(['POST'])
def login(request):

    # Ensure correct method was called - POST
    if request.method != 'POST':
        return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    # Retrieve username and password from http request
    username = request.data['username']
    password = request.data['password']

    # Check that username and password were provided
    if not (username and password):
        return Response({"detail": "Both username and password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Authenticate user
    user = authenticate(username=username, password=password)
    if not user:
        return Response({"detail": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
    
    # Create a token for authentication process
    token, created = Token.objects.get_or_create(user=user)
    
    # Serialize the user's data to pass it back with auth token to front end
    serializer = UserSerializer(instance=user)

    # Upon successful authentication and token creation - send the front end the token and user data
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)


'''
@route:  POST logout/
@desc:   Logout user
@body:   Empty
@access: PUBLIC
'''
@csrf_exempt
@require_POST
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def logout(request):

    if request.method != 'POST':
        return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    if request.user.is_authenticated:
        token = Token.objects.filter(user=request.user).first()
        if token:
            token.delete()
            logout(request)
            return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "User is already logged out"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"detail": "User is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
    

'''
@route:  POST register/
@desc:   Register user
@body:   Object with username and password
@access: PUBLIC
'''
@csrf_exempt
@require_POST
@api_view(['POST'])
def signup(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
@route:  GET test_token/
@desc:   Test token authentication
@body:   Empty
@access: PUBLIC
'''
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    if request.user.is_authenticated:
        return Response({"detail": "Token passed for user '{}'".format(request.user.username)})
    else:
        return Response({"detail": "No token passed"}, status=status.HTTP_401_UNAUTHORIZED)
