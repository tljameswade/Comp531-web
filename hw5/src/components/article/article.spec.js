
import React, { Component, PropTypes } from 'react'
import {expect} from 'chai'
import fetch, { mock } from 'mock-fetch'
import {shallow} from 'enzyme'
import mockery from 'mockery'
import { url } from '../../actions'
import { Article } from './article'

describe('ArticlesView (component tests)', () => {

    let Reducer, addNewPost
    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                
            }
            Reducer = require('../../reducer').default
            addNewPost = require('../main/mainactions').addNewPost
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should render article', (done) => {
        const articles = [
            {_id: 1, author: 'sq6', comments: [], date: "2017-03-17"},
            {_id: 2, author: 'sep1', comments: [], date: "2017-03-18"}
        ]
  
        const node = shallow(
            <Article articles={articles} searchArticle={_ => _} updateSearch={_ => _} />
        )
        expect(node.children().length).to.eql(2)
        expect(node.find('table').children().length).to.eql(2)
        done()
    })

    it('should dispatch actions to create a new article', (done) => {
        const oldState = {ArticleReducer:
            {
                nextArticleId: 9000000,
                articles: [
                    {_id: 1, author: 'sq6', comments: [], text: 'First article'},
                    {_id: 2, author: 'sep1', comments: [], text: 'Second article'}
                ],
                avatars:{},
                searchText: '',
                allArticles: {}
            }
        }

        const newAuthor = 'yp15'
        const newArticle = 'A new article'

        mock(`${url}/article`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            json: { articles: [
                    {_id: 1, author: 'sq6', comments: [], text: 'First article'},
                    {_id: 2, author: 'sep1', comments: [], text: 'Second article'},
                    {_id: 3, author: newAuthor, comments: [], text: newArticle}
            ]}
        })

        addNewPost(newAuthor, newArticle)(
            action => {
                expect(action).eql({ type: 'Add_New_Article', newArticle: newArticle, author: newAuthor })
                const newState = Reducer(oldState, action)
                expect(newState.ArticleReducer.articles.length).to.be.eql(3)
                expect(newState.ArticleReducer.articles[2].author).to.be.eql(newAuthor)
                expect(newState.ArticleReducer.articles[2].text).to.be.eql(newArticle)
                done()
            }            
        )
    })
})