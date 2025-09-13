from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User

@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get('email')
    name = data.get('name')
    picture = data.get('image')

    if not email:
        return Response({"error": "Email requis"})
    user, created = User.objects.get_or_create(
        email = email,
        picture = picture,
        defaults = {
            "name": name,
            "description": "Cette utilisateur n'a pas encore modifié sa description"
        }
    )

    if created:
        message = "Nouvel utilisateur créé et connecté"
    else:
        message = "Utilisateur existant connecté"

    return Response(
    {
        "message": message,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "picture": user.picture,
            "description": user.description,
        }
    })
