
const express = require('express')
const bodyParser = require('body-parser')

const hello = (req, res) => res.send({ hello: 'world' })

const articlelist = {
    articles: [
        {
            id: 1,
            author: "Scott",
            text: "This is my first article"
        },
        {
            id: 2,
            author: "James",
            text: "This is my second article"
        },
        {
            id: 3,
            author: "Jing",
            text: "This is my third article"
        }
    ]
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     let newId = articlelist.articles.length
     let newText = req.body.text
     console.log(newText)
     let newArticle = {
         id: newId + 1,
         author: "new Author",
         text: newText
     }
     articlelist.articles.push(newArticle)  
     res.send(newArticle)
}

const getArticles = (req, res) => {
    res.send(articlelist)
}

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})