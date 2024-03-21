from django.urls import path
from . import views

urlpatterns = [
    # define your URL patterns here

    path('fetchAutoComplete/', views.fetchAutoComplete),
    path('fetchNextWordPrediction/', views.fetchNextWordPrediction),


]