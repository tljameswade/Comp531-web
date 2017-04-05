import React from 'react'
import { connect } from 'react-redux'

//Each follower of the sidebar
const EachFollower = ({ name, status, imgloc, unfollow }) => {
    return(
        <div className="sidebar">
            <img src={imgloc} id="followerImg" className="img-circle" />
            <div id="followingName"><b>{name}</b></div>
            <p className="activestatus">{status}</p>
            <input type='button' value='Unfollow' className="btn btn-info"
            onClick={unfollow} />
        </div>
    )
}

export default connect(
    null,
    (dispatch, ownProps) => {
        return {
            unfollow: () => dispatch({ type: 'Unfollow', id: ownProps.id})
        }
    }
)(EachFollower)
