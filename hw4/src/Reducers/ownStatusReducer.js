const defaultstatus='Work hard!'

//The reducer to keep track of the status of the headline
const ownStatusReducer = (state = {
    ownStatus: defaultstatus
}
, action) => {
    switch (action.type) {
        case 'Update_Status':
            return {
                ownStatus: action.text
            }
        default:
            return state
    }
}

export default ownStatusReducer
