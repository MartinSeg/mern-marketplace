import React, { useState , useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {signIn} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const SignInScreen = (props) => {

    const dispatch = useDispatch();
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'
    const userSignIn = useSelector(state => state.userSignIn)
    const { userInfo, loading, error } = userSignIn

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch( signIn(email, password));
    }

    useEffect(() => {
       if(userInfo){
           props.history.push(redirect)
       }
    }, [userInfo, props.history, redirect])

    return (
        <div>
            <form onSubmit={submitHandler} className='form'>
                <div>
                    <h1> Sign In </h1>
                </div>
                   
                { loading && <LoadingBox ></LoadingBox>}
                { error && <MessageBox variant='danger' > {error} </MessageBox> }
                
                <div>
                    <label htmlFor='email' > Email </label>
                    <input type='email' id='email' required onChange={ e => setEmail(e.target.value) } placeholder='Enter Email'/> 
                </div>
                <div>
                    <label htmlFor='password' > Password </label>
                    <input type='password' onChange={ e => setPassword(e.target.value) } placeholder='Enter Password'/> 
                </div>
                <div>
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <div> New Customer? {''} <Link to={`/register?redirect=${redirect}`}>Create Your Account </Link></div>
                </div>
            </form>
        </div>
    )
}

export default SignInScreen
