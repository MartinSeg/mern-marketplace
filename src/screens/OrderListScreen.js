import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export const OrderListScreen = (props) => {

    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orderList)
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector(state => state.orderDelete)

    useEffect( () => {
        dispatch({ type: ORDER_DELETE_RESET })
        dispatch(listOrders())
    }, [dispatch, successDelete])

    const deleteHandler = (order) => {
        if(window.confirm('Are you shure you want to DELETE this order?')){
            dispatch(deleteOrder(order._id))
        }
    }

    return (
        <div>
            <h1> Order List </h1>

            { loadingDelete && <LoadingBox/>}
            { errorDelete && <MessageBox variant='danger' > { errorDelete } </MessageBox>}

            { loading 
                ? <LoadingBox/>
                : error 
                    ? <MessageBox variant='danger'> {error} </MessageBox>
                    : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> USER </th>
                                    <th> DATE </th>
                                    <th> TOTAL </th>
                                    <th> PAID </th>
                                    <th> DELIVERED </th>
                                    <th> ACTIONS </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map( order => (
                                        <tr key={order._id}>
                                            <th> {order._id} </th>
                                            <th> {order.user.name} </th>
                                            <th> {order.createdAt.substring(0, 10)} </th>
                                            <th> {order.totalPrice.toFixed(2)} </th>
                                            <th> {order.isPaid ? order.paidAt.substring(0, 10) : 'No'} </th>
                                            <th> {order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'} </th>
                                            <th>
                                                <button 
                                                    type='button' 
                                                    className='small' 
                                                    onClick={ () => props.history.push(`/order/${order._id}`)}
                                                > Details 
                                                </button>
                                                <button
                                                    type='button' 
                                                    className='small' 
                                                    onClick={ () => deleteHandler(order)}
                                                > Delete
                                                </button>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
            }
        </div>
    )
}
