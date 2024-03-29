from . import views
from django.urls import path


urlpatterns = [
    path('loadText/', views.loadText),
    path('saveText/', views.saveText),
    path('clearText/', views.clearText),

]
