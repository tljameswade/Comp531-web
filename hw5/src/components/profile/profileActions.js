import { resource } from '../../actions'
import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'

//The update action to update according to the input update info
export const update = ({email, phone, zipcode, password, passconf, location}) => {
    if (password !== passconf) {
        return {type: 'Password_No_Match', registerInfo: 'Passwords must match!'}
    }

    return (dispatch) => {
        if (email) {
            resource('PUT', 'email', {email})
                .then(r => {
                    dispatch({ type: 'Email_Update', email: email})
                })
        }
        if (zipcode) {
            resource('PUT', 'zipcode', {zipcode})
                .then(r => {
                    dispatch({ type: 'Zipcode_Update', zipcode: zipcode})
                })
        }
        if (password) {
            resource('PUT', 'password', {password})
                .then(r => {
                    dispatch({ type: 'Password_Update', password: password})
                })
        }
    }
}

export const getProfile = () => {

    return (dispatch) => {
        const response = {}
        const email = resource('GET', 'email')
            .then(r => {
                // dispatch({ type: 'Email_Update', email: r.email })
                response.email = r.email
            })
        const zipcode = resource('GET', 'zipcode')
            .then(r => {
                // dispatch({ type: 'Zipcode_Update', zipcode: r.zipcode })
                response.zipcode = r.zipcode
            })
        const dob = resource('GET', 'dob')
            .then(r => {
                const birthDate = new Date(r.dob)
                const birthday = birthDate.getFullYear()+'-'+(birthDate.getMonth()+1)+'-'+birthDate.getDate()
                // dispatch({ type: 'Birth_Update', birth: birthday })
                response.birth = birthday
            })

        Promise.all([email, zipcode, dob]).then(() => {
            dispatch({
                type: 'Profile_Update',
                email: response.email, 
                zipcode: response.zipcode,
                birth: response.birth
            })
        })
    }
}

export const navToMain = () => {
    return {
        type: 'To_Main'
    }
}
