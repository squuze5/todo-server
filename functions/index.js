const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./utility/fbAuth');
const { getAllTodo, postOneTodo, getTodo } = require('./routes/todo');
const { addQuestionOnTodo } = require('./routes/question');
const { 
    signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getUserDetails 
} = require('./routes/user');

// Todo routes
app.get('/todo', getAllTodo);
app.post('/todo', FBAuth, postOneTodo);
app.get('/todo/:todoId', getTodo);
// TODO: get user todo
// TODO: delete todo
// TODO: edit todo

// Question routes
app.post('/todo/:todoId/addQuestion', FBAuth, addQuestionOnTodo);
// TODO: get all question by user and project
// TODO: delete question
// TODO: edit question

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getUserDetails); 

exports.api = functions.https.onRequest(app);