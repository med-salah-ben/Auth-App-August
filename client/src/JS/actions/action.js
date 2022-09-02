import axios from "axios"
import { REGISTER_USER , LOGIN_USER, LOGOUT_USER, GET_AUTH_USER } from "../constant/actionsTypes";

//register user

export const registerUser = (formdata) =>async(dispatch)=>{
    try {
        const res = await axios.post('/api/user/register',formdata)
        console.log(res)
        dispatch({
            type:REGISTER_USER,
            payload:res.data // {user,msg,token}
        })
    } catch (error) {
        console.dir(error) 
        const {errors} = error.response.data   
        if(Array.isArray(errors)){
            errors.forEach(err=>alert(err.msg))
        }        
    }
}

//register user

export const loginUser = (formdata) =>async(dispatch)=>{
    try {
        const res = await axios.post('/api/user/login',formdata)
        console.log(res)
        dispatch({
            type:LOGIN_USER,
            payload:res.data // {user,msg,token}
        })
    } catch (error) {
        console.dir(error) 
        const {errors} = error.response.data   
        if(Array.isArray(errors)){
            errors.forEach(err=>alert(err.msg))
        }
    }
}

export const getAuthUser = () =>async (dispatch)=>{
    try {
        //headers
        const config = {
            headers:{
                "x-auth-token":localStorage.getItem('token')
            }
        }
        const res = await axios.get("/api/user/user",config)
        dispatch({
            type:GET_AUTH_USER,
            payload:res.data // {user:req.user}
        })
    } catch (error) {
        console.log(error)
    }
}


export const logoutUser = ()=> {
   return {type:LOGOUT_USER}
}