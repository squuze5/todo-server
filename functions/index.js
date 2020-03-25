const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./utility/fbAuth');
const { getAllTodo, postOneTodo } = require('./routes/todo');
const { signup, login, uploadImage, addUserDetails, getUserDetails } = require('./routes/user');

// Todo routes
app.get('/todo', getAllTodo);
app.post('/todo', FBAuth, postOneTodo);

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getUserDetails); // test

exports.api = functions.https.onRequest(app);