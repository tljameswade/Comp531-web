import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { resource } from '../../actions'
import { getFollowers } from '../main/mainactions'
import { getArticles } from '../article/articleactions'
import { getProfile } from '../profile/profileActions'
import { navToMain } from '../profile/profileActions'


// Authentication actions
export const initVisit = () => {
    return (dispatch) => {
        resource('GET', 'headlines')
            .then(r => {
                dispatch({
                    type: 'Update_Headline',
                    username: r.headlines[0].username,
                    headline: r.headlines[0].headline
                })
                dispatch({ type:'Correct_Login', username: r.headlines[0].username })
                dispatch(getFollowers())
                dispatch(getArticles())
                dispatch(getProfile())
                dispatch(navToMain())
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const updateError = (errorMsg) => {
    return {
        type: 'Fail_Login',
        loginInfo: errorMsg
    }
}

export const register = ({accountname, dispname, email, phone, birth, zipcode, password, passconf}) => {
    if (password !== passconf) {
        return {
            type: 'Password_No_Match',
            registerInfo: 'Password must match!'
        }
    }
    else {
        return {
            type: 'Correct_Register',
            accountname,
            dispname,
            email,
            phone,
            birth,
            zipcode,
            password,
            registerInfo: 'You have correctly registered!'
        }
    }
}


//The action to show wrong login information or to direct to main page
export const setLogin = (info, username, password) => {
    if (info == 'Empty') {
        return {
            type: 'Fail_Login',
            loginInfo: 'Please input the username and password!'
        }
    }
    else {
        return (dispatch) => {

            resource('POST', 'login', {username, password})
                .then( r => {
                    dispatch({ type: 'Correct_Login', username })
                    dispatch(initVisit())
                }).catch(err => {
                    console.log(err)
                    dispatch(updateError("Wrong match of username and password!"))
                })
        }
    }
}

export const setUserName = (username) => {
    
    return {
        type: 'Correct_Login',
        username: username
    }
}
