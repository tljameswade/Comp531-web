import React from 'react'
import { setLogin } from './setLoginActions'
import { connect } from 'react-redux'

//Variable to store the info input (user name and password)
let loginacc, loginpass

const Login = ({setLogin, loginInfo, setUserName}) => {
    return (
        <div className='col-md-3' id="loginDiv">
            <div>
                <h2>Log in here</h2>
                <form>
                    <div className="form-group">
                        <label>User Name</label><br />
                        <input type="text" ref={(node) => loginacc = node} />
                    </div>
                    <div className="form-group">
                        <label>Password</label><br />
                        <input type="password" ref={(node) => loginpass = node} />
                    </div>
                    <div className="landingAlert">{ loginInfo }</div>
                    <div>
                        <input type="button" className="btn btn-primary btn-lg"
                        value="Log in" onClick={() => validate(setUserName, setLogin, loginacc, loginpass)}/>
                    </div>
                </form>
            </div>
        </div>
    )
}

//The validate function to make sure that the input user name and password are not
// empty value
const validate = (setUserName, setLogin, loginacc, loginpass) => {
    if (loginacc.value === '' || loginpass.value === '') {
        setLogin('Fail')
    }
    else {
        setLogin('Success')
        setUserName(loginacc.value)
    }
    loginacc.value=''
    loginpass.value=''
}

export default connect(
    (state) => {
        return {
            loginInfo: state.LoginReducer.loginInfo
        }
    },
    (dispatch) => {
        return {
            setLogin: (text) => dispatch(setLogin(text)),
            setUserName: (userName) => dispatch({ type: 'Correct_Login', userName})
        }
    }
)(Login)
