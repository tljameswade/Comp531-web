
//The action to show wrong login information or to direct to main page
export const setLogin = (info) => {
    if (info == 'Fail') {
        return {
            type: 'Fail_Login',
            loginInfo: 'Please input the username and password!'
        }
    }

    return {
        type: 'To_Main',
        location: 'main',
    }
}
