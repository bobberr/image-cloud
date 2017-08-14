export const toggleSuccess = () => {
    return {
        type: 'TOGGLE_SUCCESS'
    }
}

export const successFalse = () => {
    return {
        type: 'SUCCESS_FALSE'
    }
}

export const toggleError = () => {
    return {
        type: 'TOGGLE_ERROR'
    }
}

export const existedUser = () => {
    return {
        type: 'EXISTED_USER'
    }
}

export const logIn = () => {
    return {
        type: 'LOG_IN'
    }
}

export const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}

export const setUserData = (userData) => {
    return {
        type: 'SET_USERDATA',
        data: userData
    }
}

