const md5 = require('md5')
const cookieParser = require('cookie-parser')
const request = require('request')
const qs = require('querystring')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const callbackURL = 'http://localhost:3000/auth/callback'
const clientSecret = '289018ac9e0a5ce9abc3ec28b9dce30e'
const clientID = '1477223485630797'
const config = {clientSecret, clientID, callbackURL}


let users = []
// serialize the user for the session
passport.serializeUser(function(user, done) {
    users[user.id] = user
    done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id, done) {
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config, 
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile)
        })
    }))

// Default users UsersList
const UsersList = {
    'sq6': {
        username: 'sq6',
        hash: md5('12345' + 'randomsalt'),
        salt: 'randomsalt'
    }
}

// Add a new user
const newUser = (username, password) => {
    const salt = new Date().getTime() + username
    UsersList[username] = {username: username, hash: md5((password + salt)), salt: salt}
}

// The function to register for a new user
const Register = (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.status(400).send('No username and password!')
    }

    if (UsersList[req.body.username]) {
        return res.status(400).send('This user already exists!')
    }

    newUser(req.body.username, req.body.password)

    res.send({
        username: req.body.username,
        status: 'success'
    })
}

const cookieKey = 'sid'

let bookmark = 1

// Function to generate a session id
const generateCode = (userObj) => {
    return bookmark++;
}

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

// Function to login
const Login = (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!username || !password) {
        return res.status(400).send('Input username and password!')
    }

    const userObj = UsersList[username]

    if (!userObj || userObj.hash !== md5(password + userObj.salt)) {
        return res.status(401).send('Unauthorized!')
    }

    res.cookie(cookieKey, generateCode(userObj), {maxAge: 3600*1000, httpOnly: true})
    
    const msg = {username: username, result: 'success'}
    res.send(msg)
}

// Function to logout
const Logout = (req, res) => {
    bookmark = 1
    req.logout()
    res.redirect('/')
    return res.status(200).send('OK')
}

const fail = (req, res) => {
    res.send('failed to login')
}

const profile = (req, res) => {
    res.send('ok now what?', req.user)
}

module.exports = app => {
    app.use(cookieParser())
    app.use(session({ secret: 'thisismysecretMessageyoucannotguessit' }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.post('/login', Login)
    app.post('/register', Register)
    app.put('/logout', Logout)
    app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/profile', isLoggedIn, profile)
	app.use('/fail', fail)
}