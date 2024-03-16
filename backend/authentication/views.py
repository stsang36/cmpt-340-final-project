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
from backend.authentication.serializers import UserSerializer
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
def login_views(request):

    # Ensure correct method was called - POST
    if request.method != 'POST':
        return Response({"detail": "Method not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    # Retrieve username and password from http request
    username = request.data['username']
    password = request.data['password']

    # Check that username and password were provided
    if not username or not password:
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
@access: PRIVATE
'''
@csrf_exempt
@require_POST
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_views(request):

    # Check if user is authenticated
    if request.user.is_authenticated:
        token = Token.objects.filter(user=request.user).first()
        if token:
            token.delete()
            logout(request)
            return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)
        else:
            # Token doesn't exist for the user
            return Response({"detail": "User is not logged in"}, status = status.HTTP_401_UNAUTHORIZED)
    else:
        # User is not logged in
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
def register_views(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
@route:  GET test_token/
@desc:   Test token authentication
@body:   Empty
@access: PRIVATE
'''
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token_views(request):
    if request.user.is_authenticated:
        return Response({"detail": "Token passed for user '{}'".format(request.user.username)})
    else:
        return Response({"detail": "No token passed"}, status=status.HTTP_401_UNAUTHORIZED)
