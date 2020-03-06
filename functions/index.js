const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/todo', (req, res) => {
    admin
        .firestore()
        .collection('todo')
        .get()
        .then(data => {
            let todo = [];
            data.forEach(doc => {
                todo.push(doc.data());
            });
            return res.json(todo);
        })
        .catch(err => console.error(err));
});

app.post('/todo', (req, res) => {
    const newTodo = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin
        .firestore()
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

exports.api = functions.https.onRequest(app);