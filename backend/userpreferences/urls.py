from django.urls import path
from . import views

urlpatterns = [
    # define your URL patterns here
    path('fetchLockedKeys/', views.fetchLockedKeys),
    path('addLockedKey/', views.addLockedKey),
    path('removeLockedKey/', views.removeLockedKey),

]