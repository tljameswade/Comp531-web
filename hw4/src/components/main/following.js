import React from 'react'
import { connect } from 'react-redux'
import EachFollower from './eachfollower'

//The function to add the sidebar
const Following = ({followers, AddFollower}) => {
    let inputFollower;

    return(
        <div className="col-md-4" id="followingDiv">
            <div id="followingInfo">You are following: </div>
            <div>
                {
                    followers.map((follower) => (
                        <EachFollower key={follower.id} id={follower.id} name={follower.name}
                        imgloc={follower.imgloc} status={follower.status} />
                    ))
                }
            </div>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Add a new follower"
                ref={(node) => inputFollower = node}/>
                <span className="input-group-btn">
                    <input type="button" className="btn btn-success"
                    value="Add Follower" onClick={() =>
                        {
                            if(inputFollower.value !== '') {
                                AddFollower(inputFollower.value)
                                inputFollower.value=''
                            }
                        }} />
                </span>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            followers: state.FollowReducer.followers
        }
    },
    (dispatch) => {
        return {
            AddFollower: (newFollower) => dispatch({ type: 'Add_Follower', newFollower })
        }
    }
)(Following)
