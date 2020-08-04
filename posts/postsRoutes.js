const express = require('express');
const router = express.Router();

const Posts = require('../data/db');

router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }else{
        Posts.insert(req.body)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error while saving the post to the database." });
            })
    }
});

router.post('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (!req.body.text){
                res.status(400).json({ errorMessage: "Please provide text for the comment." });
            }else if (post.length === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else {
                const comment = {
                    text: req.body.text,
                    post_id: req.params.id
                }
                Posts.insertComment(comment)
                    .then(comment => {
                        res.status(201).json(comment);
                    })
                    .catch(() => {
                        res.status(500).json({ error: "There was an error while saving the comment to the database." });
                    })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error in the database" });
        })
});

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else {
                res.status(200).json(post[0]);
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
});

router.get('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else {
                Posts.findPostComments(req.params.id)
                    .then(comments => {
                        res.status(200).json(comments);
                    })
                    .catch(() => {
                        res.status(500).json({ error: "The comments information could not be retrieved." });
                    })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" });
        })
});

router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else {
                Posts.remove(req.params.id)
                    .then(() => {
                        res.status(200).json(post[0]);
                    })
                    .catch(() => {
                        res.status(500).json({ error: "The post could not be removed." });
                    })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" });
        })
});

router.put('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post.length === 0){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else if (!req.body.title || !req.body.contents){
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }else {
                Posts.update(req.params.id, req.body)
                    .then(() => {
                        Posts.findById(req.params.id)
                            .then(post => {
                                res.status(200).json(post[0]);
                            })
                    })
                    .catch(() => {
                        res.status(500).json({ error: "The post could not be modified." });
                    })
            }
        })
        .catch(() => {
            res.status(500).json({ message: "The post information could not be retrieved" });
        })
});

module.exports = router;