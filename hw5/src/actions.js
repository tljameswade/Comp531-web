import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

// For connecting to the dummy server

export const url = 'https://webdev-dummy.herokuapp.com'

export const resource = (method, endpoint, payload) => {
    const options = {
        method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (payload) options.body = JSON.stringify(payload)

    return fetch(`${url}/${endpoint}`, options)
        .then(r => {
            if (r.status === 200) {
                return (r.headers.get('Content-Type').indexOf('json') > 0 ? r.json() : r.text())
            }
            else {
                console.error(`${method} ${endpoint} ${r.statusText}`)
                throw new Error(r.statusText)
            }
        })
}