import React from 'react'
import { connect } from 'react-redux'
import {ownprofileimg} from '../main/nav'

//The part which shows the profile picture, nav to Main page button and an
//upload new picture button
const Avatar = ({navToMain}) => {
    return (
        <div className="col-md-4">
            <div className="row" id="navMainButton">
                <div className="col-md-6">
                    <input type="submit" className="btn btn-primary btn-lg" value="Main Page"
                    onClick={navToMain} />
            </div>
            <br />
            <div className="col-md-12">
                <img id='profileimg' src={ownprofileimg} />
            </div>
            <div className="row" id="profileUpload">
                <input type="file" value="Upload new picture" />
            </div>
            </div>
        </div>
    )
}

export default connect(
    null,
    (dispatch) => {
        return {
            navToMain: () => dispatch({ type: 'To_Main'})
        }
    }
)(Avatar)
