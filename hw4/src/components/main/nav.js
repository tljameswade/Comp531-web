import React from 'react'
import { connect } from 'react-redux'

export const ownprofileimg = "https://i.ytimg.com/vi/YmIbnfh-2DA/maxresdefault.jpg"

//The left upper corner component to show the profile image as well as
//buttons to navigate to profile page or to log out
const Navbar = ({navToLanding, navToProfile, ownname, ownStatus, updateStatus}) => {
    let inputText;

    return(
        <div className="col-md-4 col-sm-12">
            <div className="btn-group btn-group-lg" role="group">
                <input type="button" className="btn btn-primary"
                onClick={navToLanding} value="Log Out" />
                <input type="button" className="btn btn-primary"
                onClick={navToProfile} value="Profile" />
            </div>
            <div>
                <img id="navProfileImg" src={ownprofileimg} />
                <div id="greetingGuest">Hello, <b>{ownname}</b></div>
                <p className="activestatus">I am: <b>{ownStatus}</b></p>
            </div>
            <div className="input-group" id="updateStatusInput">
                <input type="text" className="form-control" placeholder="New Status"
                ref={(node) => inputText = node}/>
                <span className="input-group-btn">
                    <input type="submit" value="Update" className="btn btn-success" onClick={() => {
                        updateStatus(inputText.value)
                        inputText.value=''}}/>
                </span>
            </div>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            ownname: state.RegisterReducer.dispname,
            ownStatus: state.OwnStatusReducer.ownStatus
        }
    },
    (dispatch) => {
        return {
            navToProfile: () => dispatch({ type: 'To_Profile'}),
            navToLanding: () => dispatch({ type: 'To_Landing'}),
            updateStatus: (text) => dispatch({ type: 'Update_Status', text})
        }
    }
)(Navbar)
