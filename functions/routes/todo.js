const { db } = require('../utility/admin');

exports.getAllTodo = (req, res) => {
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
}

exports.postOneTodo = (req, res) => {
    if(req.body.body === '') {
        return res.status(400).json({ body: 'Must not be empty' });
    }

    const newTodo = {
        body: req.body.body,
        userHandle: req.user.handle,
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
}