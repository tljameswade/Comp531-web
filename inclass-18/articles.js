const express = require('express')
const bodyParser = require('body-parser')

let articles = [
    {
        id: 1,
        author: 'First',
        text: 'First article'
    },
    {
        id: 2,
        author: 'Second',
        text: 'Second article'
    },
    {
        id: 3,
        author: 'Third',
        text: 'Third article'
    }
]
let nextId = 4

const getArticles = (req, res) => {
    if (req.params.id) {
        res.send(articles.filter(article => { return article.id === req.params.id }))
    }
    else {
        res.send(articles)
    }
}

const postArticle = (req, res) => {
    id = nextId
    nextId++
    newArticle = {
        id,
        author: req.body.author,
        text: req.body.text
    }
    articles.push(newArticle)
    res.send(newArticle)
}

module.exports = (app) => {
    app.get('/articles/:id*?', getArticles)
    app.post('/article', postArticle)
}