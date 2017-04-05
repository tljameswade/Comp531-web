
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
    res.send({headlines:[
        {
            username: req.params.user || "Not found",
            headline: "This is the headline you want"
        }
    ]})
}

const putHeadline = (req, res) => {
    res.send({
        username: "JQ",
        headline: req.body.headline || "Not found"
    })
}

const getEmail = (req, res) => {
    res.send({
        username: req.params.user || "Not found",
        email: "sq6@rice.edu"
    })
}

const putEmail = (req, res) => {
    res.send({
        username: "JQ",
        email: req.body.email || "Not found"
    })
}

const getZipcode = (req, res) => {
    res.send({
        username: req.params.user || "Not found",
        zipcode: "77005"
    })
}

const putZipcode = (req, res) => {
    res.send({
        username: "JQ",
        zipcode: req.body.zipcode || "Not found"
    })
}

const getAvatars = (req, res) => {
    res.send({ avatars:[
        {
            username: req.params.user || "Not found",
            avatar: "avatar.jpg"
        }
    ]})
}

const putAvatar = (req, res) => {
    res.send({
        username: "JQ",
        avatar: req.body.avatar || "Not found"
    })
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
}
