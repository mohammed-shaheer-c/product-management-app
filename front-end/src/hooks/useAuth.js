import { getLoggedinUser } from '../utils/helpers'

// Function for check is user login or not
const isUserLogin = () =>{
    const userProfileSession = getLoggedinUser();
    const loggedIn = userProfileSession ? userProfileSession : null
    

    return loggedIn;
}

export { isUserLogin };