import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword , setConfirmPassword ] = useState('')

    const { userInfo } = useSelector( state => state.userSignIn)
    const { user, loading, error } = useSelector( state => state.userDetails)
    const { loading: loadingUpdate, success: successUpdate, error:  errorUpdate } = useSelector( state => state.userUpdateProfile)
    const dispatch = useDispatch();
    
    useEffect( () => {

        dispatch({ type: USER_UPDATE_PROFILE_RESET })

        if(!user){
            dispatch( detailsUser(userInfo._id) )
        }else{
            setName(user.name)
            setEmail(user.email)
        }
        
    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert('Password must be equal')
        }else{
            dispatch(updateUserProfile({ userId: user._id, name, email, password}))
            setPassword('')
            setConfirmPassword('')
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> User Profile</h1>
                </div>

                { loading 
                    ? <LoadingBox/>
                    : error
                        ? <MessageBox variant='danger'> {error} </MessageBox>
                        : 
                        <>
                            { loadingUpdate && <LoadingBox/> }
                            { errorUpdate && <MessageBox variant='danger'>{errorUpdate}</MessageBox> }
                            { successUpdate && <MessageBox variant='success' > Profile Updated Successfully</MessageBox>}

                            <div>
                                <label htmlFor='name'> Name </label>
                                <input 
                                    id='name' 
                                    type='text' 
                                    value={name} 
                                    placeholder='Enter Name' 
                                    onChange={ e => setName(e.target.value) }
                                /> 
                            </div>
                            <div>
                                <label htmlFor='email'> Email </label>
                                <input 
                                    id='email' 
                                    type='email' 
                                    value={email} 
                                    placeholder='Enter email' 
                                    onChange={ e => setEmail(e.target.value) }
                                /> 
                            </div>
                            <div>
                                <label htmlFor='password'> Password </label>
                                <input 
                                    id='password' 
                                    type='password'  
                                    placeholder='Enter password'  
                                    onChange={ e => setPassword(e.target.value) }
                                /> 
                            </div>
                            <div>
                                <label htmlFor='confirmPassword'> ConfirmPassword </label>
                                <input 
                                    id='confirmPassword' 
                                    type='password' 
                                    placeholder='Confirm Password' 
                                    onChange={ e => setConfirmPassword(e.target.value) }
                                /> 
                            </div>
                            <div>
                                <label/>
                                <button className='primary' type='submit'> Update User </button>
                            </div>
                        </>
                } 
            </form>
        </div>
    )
}

export default ProfileScreen
