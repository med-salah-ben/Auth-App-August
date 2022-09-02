import { REGISTER_USER,LOGIN_USER, LOGOUT_USER, GET_AUTH_USER } from "../constant/actionsTypes";

const initialState = {
    token:localStorage.getItem("token"),
    user:null,
    isAuth:false,
    isLoading:false,
    msg:null
}

const authReducer = (state=initialState,{type,payload}) =>{
    switch (type) {
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token', payload.token)
            return {...state,isLoading:false,isAuth:true,...payload}
        case LOGOUT_USER:
            localStorage.removeItem('token')
            return {...state,isLoading:false,isAuth:false,user:null,msg:null}
        case GET_AUTH_USER : 
            return{...state,isLoading:false,isAuth:true,...payload}
        default:
            return state
    }
}

export default authReducer