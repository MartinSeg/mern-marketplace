import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

//el dsipatch y el getState vienen como paramtetros. gracias al redux-thunk
export const addToCart = (productId, qty) => async (dispatch, getState) => {

    try{

        const { data } = await axios.get(`/api/products/${productId}`);
        const { name, image, price, countInStock, _id} = data;
        
        dispatch({ 
            type: CART_ADD_ITEM, 
            payload: { name, image, price, countInStock, product: _id, qty}
        })

        //Esta linea guarda el carrito en el LS para que al reiniciar la pagina, se cargue con el codigo que 
        //se puso en el initial State del Store
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    }catch(error){
        console.log(error)
    }
    
}

export const removeFromCart = ( id ) => async ( dispatch, getState ) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingAddress = data => dispatch => {
    
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => dispatch => {

    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data})

}