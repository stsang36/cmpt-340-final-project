from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class AuthenticationAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.signup_url = 'http://127.0.0.1:8000/authentication/signup'
        self.login_url = 'http://127.0.0.1:8000/authentication/login'

    # Signup Tests
    def test_signup_user(self):
        data = {'username': 'newuser', 'password': 'newpassword'}
        response = self.client.post(self.signup_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signup_user_duplicate(self):
        existing_user = User.objects.create_user(username='newuser', password='newpassword')
        data = {'username': 'newuser', 'password': 'newpassword'}
        response = self.client.post(self.signup_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Login Tests
    def test_login_user(self):
        existing_user = User.objects.create_user(username='newuser', password='newpassword')
        data = {'username': 'newuser', 'password': 'newpassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_user_no_account(self):
        data = {'username': 'newuser', 'password': 'newpassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_login_user_missing_field(self):
        existing_user = User.objects.create_user(username='newuser', password='newpassword')
        data = {'username': '', 'password': 'newpassword'}
        response = self.client.post(self.login_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # Logout Tests
    
    # Token Test