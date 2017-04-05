
//The update action to update according to the input update info
export const update = ({accountname, dispname, email, phone, zipcode, password, passconf, location}) => {
    if (password !== passconf) {
        return {type: 'Password_No_Match', registerInfo: 'Passwords must match!'}
    }
    return {
        type: 'Correct_Update',
        accountname,
        dispname,
        email,
        phone,
        zipcode,
        password,
        location: 'profile'
    }
}
