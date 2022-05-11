const SET_IS_AUTH = "SET_IS_AUTH";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_IS_NEED_REDIRECT = "SET_IS_NEED_REDIRECT";
const SET_USER_DATA = "SET_USER_DATA";


let initialState = {
    isAuth : false,
    isLoading: false,
    isNeedRedirect: false,
    user : {
        login: "",
        password: ""
    },
    
}

const authReducer = (state = initialState, action) =>{
    switch (action.type){
        case SET_IS_AUTH: {
            
            let stateCopy= {...state, isAuth: action.isAuth}
            return stateCopy
        }
        case SET_IS_LOADING: {
            
            let stateCopy = {...state, isLoading: action.isLoading}
            return stateCopy
        }
        case SET_IS_NEED_REDIRECT:{
            
            let stateCopy = {...state, isNeedRedirect: action.isNeedRedirect}
            return stateCopy
        }
        case SET_USER_DATA: {
            
            let stateCopy = {...state, user: {...action.userData}}
            return stateCopy
        }
        default: 
            return state
    }
}

export const setIsAuthAC = (isAuth) => ({type: SET_IS_AUTH, isAuth});
export const setIsLoadingAC = (isLoading) => ({type: SET_IS_LOADING, isLoading});
export const setIsNeedRedirectAC = (isNeedRedirect) => ({type: SET_IS_NEED_REDIRECT, isNeedRedirect});
export const setUserDataAC = (userData) => ({type: SET_USER_DATA, userData})
export default authReducer