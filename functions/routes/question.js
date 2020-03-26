const { db } = require('../utility/admin');

exports.addQuestionOnTodo = (req, res) => {
    if (req.body.body === '') {
        return res.status(400).json({ 
            error: 'Must not be empty'
         });
    }

    const newQuestion = {
        todoId: req.params.todoId,
        name: req.body.name,
        userHandle: req.user.handle,
        status: true,
        crearedAt: new Date().toISOString(),
        userImage: req.user.imageUrl
    }

    db  
        .doc(`/todo/${req.params.todoId}`)
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(400).json({
                    error: 'Todo not found'
                });
            }
            return doc
                .ref
                .update({ questionCount: doc.data().questionCount + 1 });
        })
        .then(() => {
            return db
                .collection('question')
                .add(newQuestion);
        })
        .then(() => {
            res.json(newQuestion);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.code });
        });
}

exports.editQuestion = (req, res) => {
    const document = db.doc(`/question/${req.params.questionId}`);
    let editQuestion = {
        name: req.body.name
    }

    if (editQuestion.name == '') {
        res.status(400).json({ error: 'Must not be empty' });
    }

    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Question not found'
                });
            }
            if (doc.data().userHandle !== req.user.handle) {
                return res.status(403).json({
                    error: 'Unauthorized'
                });
            } else {
                return document.update(editQuestion);
            }
        })
        .then(() => {
            res.json({ message: 'Question editing successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}

exports.deleteQuestion = (req, res) => {
    const document = db.doc(`/question/${req.params.questionId}`);

    document
        .get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Question not found'
                });
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: 'Question deleted successfully' });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}