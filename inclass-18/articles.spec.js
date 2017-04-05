/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url('/articles'))
            .then(r => {
                expect(r.status).to.eql(200)
                return r.json()
            })
            .then(body => {
                expect(Object.keys(body).length >= 3).to.be.true
            }).then(done).catch(done)
 	}, 200)


    it('should add two articles with successive article ids, and return the article each time', (done) => {
        // add a new article
        // verify you get the article back with an id
        // verify the content of the article
        // add a second article
        // verify the article id increases by one
        // verify the second artice has the correct content
        let id1, id2
        let article1 = { "text": "This is a new article" }
        let article2 = { "text": "This is a new article" }        
        fetch(url('/article'), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(article1)
        }).then(r => {
            expect(r.status).to.eql(200)
            return r.json()
        }).then(body => {
            expect(body).to.have.ownProperty('id')
            expect(body.text).to.eql(article1.text)
            id1 = body.id
        }).then( () => {
            return fetch(url('/article'), {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(article2)
            })
        }).then(r => {
            expect(r.status).to.eql(200)
            return r.json()
        }).then(body => {
            expect(body).to.have.ownProperty('id')
            expect(body.text).to.eql(article2.text)
            id2 = body.id
            expect(id2 == id1 + 1).to.be.true
        }).then(done).catch(done)
    }, 200)

    it('should return an article with a specified id', (done) => {
        // call GET /articles first to find an id, perhaps one at random
        // then call GET /articles/id with the chosen id
        // validate that only one article is returned
        fetch(url('/articles'))
        .then(r =>{
            return r.json()
        })
        .then(body => {
            const size = Object.keys(body).length
            const randomId = Math.floor(1 + Math.random() * size)
            fetch(url(`/articles/${randomId}`))
                .then(r => {
                    expect(Object.keys(r)).to.have.length(1)
                })
        }).then(done).catch(done)
    }, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/0"))
            .then(r => {
                expect(r.status).to.eql(200)
                return r.text()
            }).then(body => {
                expect(JSON.parse(body).length).to.eql(0)
            }).then(done).catch(done)
	}, 200)

});