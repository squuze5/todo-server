const functions = require('firebase-functions');
const express = require('express');
const app = express();

const FBAuth = require('./utility/fbAuth');
const { 
    addQuestionOnTodo, 
    deleteQuestion, 
    editQuestion 
} = require('./routes/question');

const { 
    getAllTodo, 
    postOneTodo, 
    getTodo, 
    deleteTodo,
    editTodo
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
app.post('/todo/:todoId', FBAuth, editTodo);
// TODO: when deleting todo, delete all question to todo id 

// Question routes
app.post('/todo/:todoId/addQuestion', FBAuth, addQuestionOnTodo);
app.delete('/question/:questionId', FBAuth, deleteQuestion);
app.post('/question/:questionId', FBAuth, editQuestion);

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getUserDetails); 

exports.api = functions.https.onRequest(app);