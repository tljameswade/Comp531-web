import React from 'react'
import { connect } from 'react-redux'
import { update } from './profileActions'

//The function to update info which is similar to the register function
const UpdateInfo = ({email, phone, zipcode, password, passconf, updateInfo, dispatch}) => {
    return (
        <div className="col-md-3" id="updateInfoDisp">
            <h2>Update Info</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                const payload = {
                email: email.value,
                phone: phone.value,
                zipcode: zipcode.value,
                password: password.value,
                passconf: passconf.value,
                }
                dispatch(update(payload))
                if (password.value == passconf.value) {
                    email.value = ''
                    phone.value = ''
                    zipcode.value = ''
                    password.value = ''
                    passconf.value = ''
                }}}>
                <div className="form-group">
                    <label>Email Address</label><br />
                    <input type="email" ref={(node) => email = node}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
                </div>
                <div className="form-group">
                    <label>Phone Number</label><br />
                    <input type="tel" ref={(node) => phone = node} pattern="\d{3}[\-]\d{3}[\-]\d{4}" />
                </div>
                <div className="form-group">
                    <label>Zipcode</label><br />
                    <input type="zipcode" ref={(node) => zipcode = node} pattern="\d{5}" />
                </div>
                <div className="form-group">
                    <label>Password</label><br />
                    <input type="password" ref={(node) => password = node} />
                </div>
                <div className="form-group">
                    <label>Password Confirmation</label><br />
                    <input type="password" ref={(node) => passconf = node} />
                </div>
                <div className="landingAlert">{ updateInfo }</div>
                <div>
                    <input type="submit" className="btn btn-primary btn-lg" value="Update" />
                </div>
            </form>
        </div>
    )
}

export default connect(
    (state) => {
        return {
            updateInfo: state.RegisterReducer.registerInfo
        }
    }, null
)(UpdateInfo)
