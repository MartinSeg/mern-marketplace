import React, { useState , useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {register} from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const RegisterScreen = (props) => {

    const dispatch = useDispatch();
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    
    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/'
    const userRegister = useSelector(state => state.userRegister);
    const userSignin = useSelector(state => state.userSignIn);
    const { userInfo } = userSignin;
    const { loading, error } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();
        if( password !== confirmPassword ){
            alert('ojo')
        }else{
            dispatch( register(name, email, password));
        }
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
                    <h1> Create Account </h1>
                </div>
                   
                { loading && <LoadingBox ></LoadingBox>}
                { error && <MessageBox variant='danger' > {error} </MessageBox> }
                
                <div>
                    <label htmlFor='name' > Name </label>
                    <input type='text' id='name' required onChange={ e => setName(e.target.value) } placeholder='Enter Name'/> 
                </div>
                <div>
                    <label htmlFor='email' > Email </label>
                    <input type='email' id='email' required onChange={ e => setEmail(e.target.value) } placeholder='Enter Email'/> 
                </div>
                <div>
                    <label htmlFor='password' > Password </label>
                    <input type='password' onChange={ e => setPassword(e.target.value) } placeholder='Enter Password'/> 
                </div>
                <div>
                    <label htmlFor='confirmPassword' > Confirm Password </label>
                    <input type='password' onChange={ e => setConfirmPassword(e.target.value) } placeholder='Confirm Password'/> 
                </div>
                <div>
                    <label/>
                    <button className='primary' type='submit'>Register</button>
                </div>
                <div>
                    <div> Already have an account ? {''} <Link to={`/signin?redirect=${redirect}`}> Sign In </Link></div>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen
