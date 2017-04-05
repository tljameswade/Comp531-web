
export const register = ({accountname, dispname, email, phone, birth, zipcode, password, passconf}) => {
    if (password !== passconf) {
        return {type: 'Password_No_Match', registerInfo: 'Passwords must match!'}
    }
    return {
        type: 'Correct_Register',
        accountname,
        dispname,
        email,
        phone,
        birth,
        zipcode,
        password,
        location: 'main'
    }
}
