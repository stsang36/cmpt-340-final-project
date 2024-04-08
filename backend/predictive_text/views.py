from django.shortcuts import render
from django.views.decorators.http import require_GET
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from userpreferences.models import preferences
from csv import DictReader
from os.path import join
from django.conf import settings
import nltk
from nltk import ngrams
from collections import defaultdict





COMPLETION_DATASET_PATH = join(settings.BASE_DIR, 'predictive_text\datasets', 'unigram_freq.csv')
PERSONAL_PREDICTIVE_FACTOR = 10000000000 # factor to increase the count of the word if it is in the user's frequent words
NEXT_WORD_DATASET_PATH = join(settings.BASE_DIR, 'predictive_text\datasets', 'Next_Word_Prediction.txt')



# Create your views here.

'''
@route:  GET api/fetchTopWords/
@desc:   Fetches the top words for the user
@body:   Given a unfinished word, fetches the top 3 words
@access: Private
'''

@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])

def fetchAutoComplete(request):

    user = request.user
    unfinished_word = request.data['unfinished_word']

    try:
        with open(COMPLETION_DATASET_PATH, 'r') as f:
            dict_reader = DictReader(f)
            data = list(dict_reader)
    except:
        return Response({"detail": "Error dataset"}, status=status.HTTP_400_BAD_REQUEST)


    #fetch frequent words from user preferences
    try: 
        pref, created = preferences.objects.get_or_create(user=user)
    except:
        return Response({"detail": "Error fetching user preferences"}, status=status.HTTP_400_BAD_REQUEST)

    frequent_words = pref.frequent_used_words

    for word in data:
        word['count'] = int(word['count'])

        if not created:
            if word['word'] in frequent_words:
                word['count'] += frequent_words[word['word']] * PERSONAL_PREDICTIVE_FACTOR

        

    if not created: # the dataset is already sorted, only sort if we update it.
        data.sort(key=lambda x: x['count'], reverse=True)


    top3_words = []

    counter = 0
    for word in data:
        if word['word'].startswith(unfinished_word):
            top3_words.append(word['word'])
            counter += 1

            if counter == 4:
                break
    
    return Response({"topWords": top3_words}, status=status.HTTP_200_OK)


'''
@route:  GET api/fetchNextWord/
@desc:   Fetches the next word for the user.
@body:   Given a single word, tries to predict the next word. Returns None if no prediction is possible.
@access: Private
'''

@api_view(['GET'])
@require_GET
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])

def fetchNextWordPrediction(request):

    sentence = request.data['prefix_word']

    if sentence == "" or sentence is None:
        return Response({"detail": "Empty sentence"}, status=status.HTTP_400_BAD_REQUEST)

    sentence = sentence.lower().split()
    tuple_sentence = tuple(sentence)

    if len(tuple_sentence) != 1:
        return Response({"detail": "not a single word"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        words = open(NEXT_WORD_DATASET_PATH).read()
    except:
        return Response({"detail": "Error fetching dataset"}, status=status.HTTP_400_BAD_REQUEST)
    
    words = nltk.word_tokenize(words)
    words = [word.lower() for word in words if word.isalnum()]
    
    N = 2

    n_grams = list(ngrams(words, N))

    n_gram_freq = defaultdict(int)
    for n_gram in n_grams:
        n_gram_freq[n_gram] += 1

    def next_word_predictor(prefix):

        top_n = 4

        matching_n_grams = [(ngram, freq) for ngram, freq in n_gram_freq.items() if ngram[:-1] == prefix]
        if not matching_n_grams:
            return Response({"prediction": None}, status=status.HTTP_200_OK)
        
        sorted_n_grams = sorted(matching_n_grams, key=lambda x: x[1], reverse=True)
        prediction = []

        for i in range(top_n):
            prediction.append(sorted_n_grams[i][0][-1])
        

        return prediction
    
    final = next_word_predictor(tuple_sentence)

    
    return Response({"prediction": final}, status=status.HTTP_200_OK)



