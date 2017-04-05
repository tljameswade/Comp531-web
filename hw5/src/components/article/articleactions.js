import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {resource} from '../../actions'


// The article actions
export const searchArticle = (text) => {
    return {
        type: 'Search_Text',
        searchText: text
    }
}

export const updateSearch = (text) => {
    return (dispatch, getState) => {
        const articles = getState().ArticleReducer.allArticles.filter((filterarticle) => {
                    if (filterarticle.text) {
                        return filterarticle.text.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
                                filterarticle.author.toLowerCase().indexOf(text.toLowerCase()) >= 0
                    }
                })
        return dispatch({
            type: 'Filter_Article',
            searchText: text,
            articles: articles
        })

    }
}

export const updateCommStatus = (id, commStatus) => {
    return {
        type: 'Show_comments',
        commId: id,
        commStatus: commStatus
    }
}


export const getArticles = () => {
    
    return (dispatch, getState) => {

        resource('GET', 'articles')
            .then(r => {
                const articles = r.articles.reduce((o, v) => {
                    o[v._id] = v
                    return o
                }, {})

        const realarticles = Object.keys(articles).map(id => articles[id])

        dispatch({ type: 'Update_Articles', realarticles })

        const avatars = getState().ArticleReducer.avatars
        const authors = new Set(r.articles.reduce((o, article) => {
            article.comments.map(c => c.author).forEach(author => o.push(author))
            return o
        }, []).filter(author => !avatars[author]))

        if (authors.size > 0) {
            resource('GET', `avatars/${[...authors].join(',')}`)
                .then(r => {
                    r.avatars.forEach(s => {
                        avatars[s.username] = s.avatar
                    })
                    dispatch({ type: 'Update_Avatars', avatars })
                })
        }

            }).catch(err => {
                console.log(err)
        })
    }
}