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

exports.getTodo = (req, res) => {
    let todoData = {};
    
    db  
        .doc(`/todo/${req.params.todoId}`)
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            todoData = doc.data();
            todoData.todoId = doc.id;
            return db.collection('question')
                .where('todoId', '==', req.params.todoId)
                .get();
        })
        .then(data => {
            todoData.questions = [];
            data.forEach(doc => {
                todoData.questions.push(doc.data());
            });
            return res.json(todoData); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.editTodo = (req, res) => {
    const document = db.doc(`/todo/${req.params.todoId}`);
    let editProject = {
        body: req.body.body
    }

    if (editProject.body == '') {
        res.status(400).json({ error: 'Must not be empty' });
    }

    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Todo not found'
                });
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({
                    error: 'Unauthorized'
                });
            } else {
                return document.update(editProject);
            }
        })
        .then(() => {
            res.json({ message: 'Todo editing successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });

}

exports.deleteTodo = (req, res) => {
    const document = db.doc(`/todo/${req.params.todoId}`);

    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Todo not found'
                });
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({
                    error: 'Unauthorized'
                });
            } else {
                return document.delete();
            }
        })
        .then(() => {
            res.json({ message: 'Todo deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}