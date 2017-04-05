import { resource } from '../../actions'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'


// Actions associated with the main page
export const getFollowers = (method, name) => {
    
    return (dispatch, getState) => {
        if (method == 'PUT' && getState().FollowReducer.followers[name]) {
            return dispatch({ type: 'Error_Follow', error: `You have already follow ${name}` })
        } 
        resource(method ? method : 'GET', 'following' + (name ? '/' + name : ''))
            .then(r => {
                if (method == 'PUT' && r.following.indexOf(name) < 0){
                    return dispatch({ type: 'Error_Follow', error: `${name} does not exist` })
                }

                const _followers = r.following.reduce((o,v,i) => {o[v] = {name: v}; return o}, {})
                const followerList = r.following.join(',')

                const updateHeadline = resource('GET', `headlines/${followerList}`)
                    .then(r => {
                        r.headlines.forEach((u)=>{
                            const user = _followers[u.username]
                            if (user){
                                user.headline = u.headline
                            }
                        })
                    })
                
                const updateAvatar = resource('GET', `avatars/${followerList}`)
                    .then(r => {
                        r.avatars.forEach((u)=>{
                            const user = _followers[u.username]
                            if (user){
                                user.image = u.avatar
                            }
                        })
                    })

                Promise.all([updateHeadline, updateAvatar]).then(()=>{
                    dispatch({type:'Update_Followers', followers: _followers})
                })    
            }).catch(err => {
                dispatch({ type: 'Error_Follow', error: 'Error occurs in following!'})
            })
    }
} 

export const unfollow = (name) => {
    return getFollowers('DELETE', name)
}

export const AddFollower = (name) => {
    return getFollowers('PUT', name)
}


export const addNewPost = (author, article) => {
    const payload={
        text: article
    }
    return (dispatch) => {
        resource('POST', 'article', payload)
            .then(r => {
                dispatch({
                    type: 'Add_New_Article',
                    newArticle: article,
                    author: author
                })
            })
    }
}


export const navToProfile = () => {
    return {
        type: 'To_Profile'
    }
}

export const ToLanding = () => {
    return {
        type: 'To_Landing'
    }
}
export const navToLanding = () => {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then(r => {
                dispatch({ type: 'To_Landing' })
            }).catch(err => {
                console.log('!!!!' + err)
                dispatch({ type: 'To_Main' })
            })
    }
}

export const updateHeadline = (name, headline) => {
    return (dispatch) => {
        const payload = {
            headline: headline
        }
        if (headline) {
            resource('PUT', 'headline', payload)
                .then(r => {
                    dispatch({
                        type: 'Update_Headline',
                        username: name,
                        headline: r.headline
                    })
                })
        }
    }
}