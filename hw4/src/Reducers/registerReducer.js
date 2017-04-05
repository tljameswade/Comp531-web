
//Default information
const defaultUser = require('../data/profile.json')
let birthdate = new Date(defaultUser.initialUser.birth)
const birthday = birthdate.getFullYear()+'-'+(birthdate.getMonth()+1)+'-'+birthdate.getDate()

//The reducer to update information based on user's input of user information
const registerReducer = (state = {
    dispname: defaultUser.initialUser.dispname,
    email: defaultUser.initialUser.email,
    phone: defaultUser.initialUser.phone,
    birth: birthday,
    zipcode: defaultUser.initialUser.zipcode
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
                registerInfo: ''
            }
        case 'Correct_Login':
            return {
                ...state,
                dispname: action.userName
            }
        case 'Correct_Update':
            return {...state,
                accountname: action.accountname,
                dispname: action.dispname,
                email: action.email,
                phone: action.phone,
                zipcode: action.zipcode,
                registerInfo: ''
            }
        default:
            return state
    }
}

export default registerReducer
