const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

var config = {
    apiKey: "AIzaSyBCcJrvlEdW3s_DcAP22HqtbojTLCClnes",
    authDomain: "todo-server-a7d16.firebaseapp.com",
    databaseURL: "https://todo-server-a7d16.firebaseio.com",
    projectId: "todo-server-a7d16",
    storageBucket: "todo-server-a7d16.appspot.com",
    messagingSenderId: "612164216533",
    appId: "1:612164216533:web:99229e52f41f4857f1e45c"
  };

const express = require('express');
const app = express();

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/todo', (req, res) => {
    db
        .collection('todo')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data => {
            let todo = [];
            data.forEach(doc => {
                todo.push({ 
                    todoId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt
                 });
            });
            return res.json(todo);
        })
        .catch(err => console.error(err));
});

app.post('/todo', (req, res) => {
    const newTodo = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    db
        .collection('todo')
        .add(newTodo)
        .then((doc) => {
            res.json({ message: `document ${doc.id} created successfully` });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        });
});

// Signup route
app.post('/singup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    db.doc(`/users/${newUser.handle}`).get()
        .then(doc => {
            if (doc.exists) {
                return res.status(400).json({ handle: 'this handle is already taken' });
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        })
});

exports.api = functions.https.onRequest(app);