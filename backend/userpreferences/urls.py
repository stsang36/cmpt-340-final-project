from django.urls import path
from . import views

urlpatterns = [
    # define your URL patterns here
    path('fetchLockedKeys/', views.fetchLockedKeys),
    path('addLockedKey/', views.addLockedKey),
    path('removeLockedKey/', views.removeLockedKey),
    path('updateContrast/', views.updateContrast),
    path('updateColorBlind/', views.updateColorBlind),
    path('fetchFrequentWords/', views.fetchFrequentWords),
    path('updateFrequentWords/', views.updateFrequentWords),
    path('clearFrequentWords/', views.clearFrequentWords),
    path('fetchAllUserPreferences/', views.fetchAllUserPreferences),
    path('resetAllUserPreferences/', views.resetAllUserPreferences),
    path('updateShortcutKeys/', views.updateShortcutKeys),
    path('fetchShortcutKeys/', views.fetchShortcutKeys),
    path('clearShortcutKeys/', views.clearShortcutKeys),
]