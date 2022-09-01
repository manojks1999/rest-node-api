import requests

# Creating new user Valid expected 200
url = 'http://localhost:8000/api/'
body ={
    "userId": 1,
    "newUserId":7,
    "userPassword": "123456789",
    "newUserPassword": "987654321",
    "name": "Man",
    "email": "man@gmail.com",
    "admin": False
}

res = requests.post(url+'createUser', json = body)
print('Creating new user Valid')

    