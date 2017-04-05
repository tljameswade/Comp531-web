import React from 'react'
import { connect } from 'react-redux'
import { unfollow } from './mainactions'

//Each follower of the sidebar
const EachFollower = ({ name, status, imgloc, unfollow }) => {
    return(
        <div className="sidebar">
            <img src={imgloc} id="followerImg" className="img-circle" />
            <div id="followingName"><b>{name}</b></div>
            <p className="activestatus">{status}</p>
            <input type='button' value='Unfollow' className="btn btn-info"
            onClick={ () => unfollow(name) } />
        </div>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            unfollow: (name) => dispatch(unfollow(name))
        }
    }
)(EachFollower)
