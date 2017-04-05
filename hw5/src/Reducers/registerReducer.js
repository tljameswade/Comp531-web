
//The reducer to update information based on user's input of user information
const registerReducer = (state = {

}
, action) => {
    switch (action.type) {
        case 'Password_No_Match':
            return {
                ...state,
                registerInfo: action.registerInfo
            }
        case 'Correct_Register':
            return {...state,
                accountname: action.accountname,
                dispname: action.dispname,
                email: action.email,
                phone: action.phone,
                birth: action.birth,
                zipcode: action.zipcode,
                registerInfo: action.registerInfo
            }
        case 'Correct_Login':
            return {
                ...state,
                dispname: action.username
            }
        case 'Profile_Update': 
            return {
                ...state,
                email: action.email,
                zipcode: action.zipcode,
                birth: action.birth
            }
        case 'Password_Update':
            return {
                ...state,
                password: action.password
            }
        case 'To_Landing':
            return {
                accountname: '',
                dispname: '',
                email: '',
                phone: '',
                birth: '',
                zipcode: '',
                registerInfo: ''
            }
        default:
            return state
    }
}

export default registerReducer
