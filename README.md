## REST API NodeJS(express) + firebase

### api adress 
```sh
https://us-central1-todo-server-a7d16.cloudfunctions.net/api
```

----
## Routes
Here are all the default routes.

### Todo routes
- GET     /todo
- GET     /todo/:todoId
- POST    /todo
- POST    /todo/:todo:id
- DELETE  /todo/:todoId

### User roures
- GET     /user
- POST    /signup
- POST    /login
- POST    /user
- POST    /user/image

### Question roures
- POST    /todo/:todoId/addQuestion
- POST    /question/:questionId
- DELETE  /question/:questionId

----
## Expected request / response

#### GET /todo (req)
```sh
[
    {
        "todoId": "5YiTOMUOVmFPN8tFErjg",
        "body": "this is name todo",
        "userHandle": "login user",
        "createdAt": "2020-03-25T20:12:44.222Z"
    }
]
```
#### GET /todo/todoId (req)
```sh
{
    "todoId": "5YiTOMUOVmFPN8tFErjg",
    "body": "this is name todo",
    "userHandle": "login user",
    "createdAt": "2020-03-25T20:12:44.222Z"
}
```

#### POST /todo (req, res)
req
```sh
{
    "body": "name todo"
}
```
res
```sh
{
    "message": "document UGcbQk6d2dDfL2kWMp4l created successfully"
}
```
```sh
{
    "body": "Must not be empty"
}
```
#### POST /todo/todoId (req, res)
req
```sh
{
    "body": "name todo"
}
```
res
```sh
{
    "message": "Todo editing successfully"
}
```
```sh
{
    "error": "Must not be empty"
}
```
```sh
{
    "error": "Todo not found"
}
```

#### DELETE /todo/todoId (res)
res
```sh
{
    "message": "Todo deleted successfully"
}
```
```sh
{
    "error": "Todo not found"
}
```
#### GET /user (res)
res
```sh
{
    "credentials": {
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/todo-server-a7d16.appspot.com",
        "createdAt": "2020-03-25T11:20:59.422Z",
        "handle": "user6",
        "email": "user6@email.com",
        "userId": "lRLwvfTA9oczZ5QbV5cnCZPDCpm1"
    }
}
```
#### POST /signup (req, res)
req
```sh
{
    "email": "user11@email.com",
    "password": "admin123456",
    "confirmPassword": "admin123456",
    "handle": "user11"
}
```
res
```sh
{
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmODhiODE0MjljYzQ1MWEzMzVjMmY1Y2RiM2RmYjM0ZWIzYmJjN2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG9kby1zZXJ2ZXItYTdkMTYiLCJhdWQiOiJ0b2RvLXNlcnZlci1hN2QxNiIsImF1dGhfdGltZSI6MTU4NTE3MjE4NiwidXNlcl9pZCI6Im5wUUhjVEthazJRWXpXcmRnRk5iRjRON01rSDIiLCJzdWIiOiJucFFIY1RLYWsyUVl6V3JkZ0ZOYkY0TjdNa0gyIiwiaWF0IjoxNTg1MTcyMTg2LCJleHAiOjE1ODUxNzU3ODYsImVtYWlsIjoidXNlcjExQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ1c2VyMTFAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bLGzU-UXm0XtyHQNHzZ5YOEi0vt4RbYjzRcrnE5gokDhwHNXxDpyWY8qVJpnwKdIRaKbS4enk80CEaLCdRfBtKXm5jbRoIkV6zr3iJRl_u46LIu4G50PiwOoWVwLNbApI-Ke12jOAo9CPz4CtFnWu91LaV_NFU6Nlq50OQtXD2MKmOrq7A1NBSQPIPeNxWgXEj-giWmmF-32MaQZu4Oigmi16U5MwNt5DBR48RxU2JHkWx9FyLK0qlydVzx1vdXClZwGjHejq6UHEUJUg6Eaa8JEjoVAKrz1i0BHo_6RME4UQLuHTie-pheR3-PvqowN4QM8NllEogaj4FUnXRa38w"
}
```
```sh
{
    "email": "Must be a valid email adress"
    "password": "Weak password, try again"
    "confirmPassword": "Password mismatch"
    "handle": "Username is already in use"
}
```

#### POST /login (req, res)
req
```sh
{
    "email": "user11@email.com",
    "password": "admin123456"
}
```
res
```sh
{
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmODhiODE0MjljYzQ1MWEzMzVjMmY1Y2RiM2RmYjM0ZWIzYmJjN2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdG9kby1zZXJ2ZXItYTdkMTYiLCJhdWQiOiJ0b2RvLXNlcnZlci1hN2QxNiIsImF1dGhfdGltZSI6MTU4NTE3MjE4NiwidXNlcl9pZCI6Im5wUUhjVEthazJRWXpXcmRnRk5iRjRON01rSDIiLCJzdWIiOiJucFFIY1RLYWsyUVl6V3JkZ0ZOYkY0TjdNa0gyIiwiaWF0IjoxNTg1MTcyMTg2LCJleHAiOjE1ODUxNzU3ODYsImVtYWlsIjoidXNlcjExQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ1c2VyMTFAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.bLGzU-UXm0XtyHQNHzZ5YOEi0vt4RbYjzRcrnE5gokDhwHNXxDpyWY8qVJpnwKdIRaKbS4enk80CEaLCdRfBtKXm5jbRoIkV6zr3iJRl_u46LIu4G50PiwOoWVwLNbApI-Ke12jOAo9CPz4CtFnWu91LaV_NFU6Nlq50OQtXD2MKmOrq7A1NBSQPIPeNxWgXEj-giWmmF-32MaQZu4Oigmi16U5MwNt5DBR48RxU2JHkWx9FyLK0qlydVzx1vdXClZwGjHejq6UHEUJUg6Eaa8JEjoVAKrz1i0BHo_6RME4UQLuHTie-pheR3-PvqowN4QM8NllEogaj4FUnXRa38w"
}
```
```sh
{
    "error": "auth/user-not-found"
}
```

#### POST /user/image (req, res)
req
```sh
{
    form-data - upload image
}
```
res
```sh
{
    message: 'Image uploaded successfully'
}
```
```sh
{
    error: 'Wrong file type submitted'
}
```
#### POST /todo/:todoId/addQuestion (req, res)
req
```sh
{
   "name": "name question"
}
```
res
```sh
{
    "todoId": "UGcbQk6d2dDfL2kWMp4l",
    "name": "name question",
    "userHandle": "user6",
    "status": true,
    "crearedAt": "2020-03-25T21:59:50.891Z",
    "userImage": "https://firebasestorage.googleapis.com/v0/b/todo-server-a7d16.appspot.com"
}
```
```sh
{
    "error": "Todo not found"
}
```
#### POST /question/:questionId (req, res)
req
```sh
{
   "name": "edit name question"
}
```
res
```sh
{
    "message": "Question editing successfully"
}
```
```sh
{
    "error": "Must not be empty"
}
```
```sh
{
    "error": "Question not found"
}
```
#### DELETE /question/questionId (res)
res
```sh
{
    "message": "Question deleted successfully"
}
```
```sh
{
    "error": "Question not found"
}
```