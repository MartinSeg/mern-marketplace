import React, {useState} from 'react'
import { useDispatch , useSelector} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import {saveShippingAddress} from '../actions/cartActions';

const ShippingAddressScreen = (props) => {

    const {userInfo} = useSelector(state => state.userSignIn);
    if(!userInfo){
        props.history.push(`/signin`)
    }

    const {shippingAddress} = useSelector( state => state.cart)

    const [ fullName, setFullName ] = useState(shippingAddress.fullName);
    const [ address, setAddress ] = useState(shippingAddress.address);
    const [ city, setCity ] = useState(shippingAddress.city);
    const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode);
    const [ country, setCountry ] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));

        props.history.push('/payment')
    }    
    
    return (
        <div>
            <CheckoutSteps step1 step2 />

            <form onSubmit={submitHandler} className='form'>
                <div>
                    <h1> Shipping Address </h1>
                </div>
                <div>
                    <label htmlFor='fullname' > Full Name </label>
                    <input 
                        type='text' 
                        id='fullname'
                        value={fullName}
                        onChange={ e => setFullName(e.target.value)} 
                        required 
                        placeholder='Enter Full name'
                    /> 
                </div>
                <div>
                    <label htmlFor='address' > Address </label>
                    <input 
                        type='text' 
                        id='address'
                        value={address}
                        onChange={ e => setAddress(e.target.value)} 
                        required 
                        placeholder='Enter Address'
                    /> 
                </div>
                <div>
                    <label htmlFor='city' > City </label>
                    <input 
                        type='text' 
                        id='city'
                        value={city}
                        onChange={ e => setCity(e.target.value)} 
                        required 
                        placeholder='Enter City'
                    /> 
                </div>
                <div>
                    <label htmlFor='postalCode' > Postal Code</label>
                    <input 
                        type='text' 
                        id='postalCode'
                        value={postalCode}
                        onChange={ e => setPostalCode(e.target.value)} 
                        required 
                        placeholder='Enter Postal Code'
                    /> 
                </div>
                <div>
                    <label htmlFor='country' > Country </label>
                    <input 
                        type='text' 
                        id='country'
                        value={country}
                        onChange={ e => setCountry(e.target.value)} 
                        required 
                        placeholder='Enter Country'
                    /> 
                </div>
                <div>
                    <label/>
                    <button type='submit' className='primary'>
                        Continue 
                    </button>
                </div>
                
            </form>

        </div>
    )
}

export default ShippingAddressScreen
