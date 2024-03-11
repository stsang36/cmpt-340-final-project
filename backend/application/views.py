from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST



'''
@route:  POST login/
@desc:   login user
@body:   obj w/ username and password
@access: PUBLIC
'''
@csrf_exempt
@require_POST
def login_views(request):
    
    if request.user.is_authenticated:
        return HttpResponse('Already logged in', status=400)

    [username, password] = request.POST['username'], request.POST['password']

    if (username == None or password == None):
        return HttpResponse('Username and Password Empty', status=400)
    
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse('Logged in', status=200)
    else:
        return HttpResponse('Invalid username or password', status=400)

'''
@route:  POST logout/
@desc:   logout user
@body:   none
@access: PRIVATE
'''
@csrf_exempt
@require_POST
def logout_views(request):

    if request.user.is_authenticated:
        logout(request)
        return HttpResponse('Logged out', status=200)
    else:
        return HttpResponse('Not logged in', status=400)
    

'''
@route:  POST register/
@desc:   register user
@body:   obj w/ username and password
@access: PUBLIC
'''
@csrf_exempt
@require_POST
def register_views(request):
    
    if request.user.is_authenticated:
        return HttpResponse('Already logged in', status=400)
    
    [username, password] = request.POST['username'], request.POST['password']

    user = User.objects.create_user(username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse('Registered and Logged in', status=200)
    else:
        return HttpResponse('Error registering', status=400)
    




