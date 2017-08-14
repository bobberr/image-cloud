const initialState = {
    success: null,
    errorRegistr: null,
    existedUser: null,
    wrongPass: false,
    loggedIn: false,
    data: null
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SUCCESS': 
            return Object.assign({}, state, {success: true, errorRegistr: false, existedUser: false} );
        case 'TOGGLE_ERROR':
            return Object.assign({}, state, {errorRegistr: true, success: false, existedUser: false});
        case 'EXISTED_USER':
            return Object.assign({}, state, {existedUser: true, success: false, errorRegistr: false});
        case 'LOG_IN':
            return Object.assign({}, state, {loggedIn: true, existedUser: false, success: false, errorRegistr: false});
        case 'LOG_OUT':
            return Object.assign({}, state, {loggedIn: false});
        case 'SUCCESS_FALSE': 
            return Object.assign({}, state, {success: false, errorRegistr: false, existedUser: false});
        case 'SET_USERDATA':
            return Object.assign({}, state, {data: action.data});
        default: 
            return state
    }
}

module.exports = reducer;