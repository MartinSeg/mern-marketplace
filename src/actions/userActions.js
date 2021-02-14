import axios from 'axios'
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from '../constants/userConstants';

export const signIn = ( email, password ) => async (dispatch) => {

    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password}})

    try{
        const { data } = await axios.post('/api/users/signin', { email, password});
        const user = data;
 
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: user})

        localStorage.setItem('userInfo', JSON.stringify(user) );

    }catch( error ){
        dispatch({ 
            type: USER_SIGNIN_FAIL, 
            payload: error.response.data.message || error.message
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_SIGNOUT });
}

export const register = ( name, email, password ) => async (dispatch) => {

    dispatch({ type: USER_REGISTER_REQUEST, payload : { email, password}})

    try{
        const { data } = await axios.post('/api/users/register', { name, email, password });
        const user = data;

        dispatch({ type: USER_REGISTER_SUCCESS, payload: user})
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: user})

        localStorage.setItem('userInfo', JSON.stringify(user) );

    }catch( error ){
        dispatch({ 
            type: USER_REGISTER_FAIL, 
            payload: error.response.data.message || error.message
        })
    }
}