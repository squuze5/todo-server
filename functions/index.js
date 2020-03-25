const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./utility/fbAuth');
const { addQuestionOnTodo, deleteQuestion } = require('./routes/question');
const { 
    getAllTodo, 
    postOneTodo, 
    getTodo, 
    deleteTodo 
} = require('./routes/todo');
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
app.delete('/todo/:todoId', FBAuth, deleteTodo);
// TODO: edit todo
// TODO: when deleting todo, delete all question to todo id 

// Question routes
app.post('/todo/:todoId/addQuestion', FBAuth, addQuestionOnTodo);
app.delete('/question/:questionId', FBAuth, deleteQuestion);
// TODO: edit question

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getUserDetails); 

exports.api = functions.https.onRequest(app);