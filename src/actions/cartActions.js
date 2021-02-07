import axios from "axios"
import { CART_ADD_ITEM } from "../constants/cartConstants"

//el dsipatch y el getState vienen como paramtetros. gracias al redux-thunk
export const addToCart = (productId, qty) => async (dispatch, getState) => {

    try{

        const { data } = await axios.get(`/api/products/${productId}`);
        const { name, image, price, countInStock, _id} = data;
        
        dispatch({ 
            type: CART_ADD_ITEM, 
            payload: { name, image, price, countInStock, product: _id, qty}
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    }catch(error){
        console.log(error)
    }
    
}