from . import views
from django.urls import path

urlpatterns = [
    path('login/', views.login_views),
    path('logout/', views.logout_views),
    path('register/', views.register_views),
    path('test_token/', views.test_token_views),
]
