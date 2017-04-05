//The login reducer to warn the user whether he/she is entering correct input
const loginReducer = (state = {}
, action) => {
    switch (action.type) {
        case 'Fail_Login':
            return {
                ...state,
                loginInfo: action.loginInfo
            }
        default:
            return state
    }
}

export default loginReducer
