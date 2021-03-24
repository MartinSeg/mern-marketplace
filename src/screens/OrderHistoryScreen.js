import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderHistoryScreen = (props) => {

    const dispatch = useDispatch();
    const {loading, orders, error} = useSelector( state => state.orderMineList);

    useEffect( () => {
        dispatch( listOrderMine() );
    }, [dispatch])

    return (
        <div>
            <h1> Order History </h1> 
            { loading
                ? <LoadingBox/>
                : error 
                    ? <MessageBox variant='danger'>{error}</MessageBox>    
                    : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map( order => (
                                    <tr key={order._id}>
                                        <th>{order._id}</th>
                                        <th>{order.createdAt.substring(0, 10)}</th>
                                        <th>{order.totalPrice.toFixed(2)}</th>
                                        <th>{order.isPaid ? order.paidAt.substring(0, 10) : 'NO'}</th>
                                        <th>{order.isDelivered? order.deliveredAt.substring(0, 10) : 'NO'}</th>
                                        <th>
                                            <button type='button' className='small' onClick={ () => props.history.push(`/order/${order._id}`)} >
                                                Details
                                            </button>
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )

            }
        </div>
    )
}

export default OrderHistoryScreen