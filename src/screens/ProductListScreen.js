import React, { useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createProduct, deleteProduct, listProducts} from '../actions/productActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

const ProductListScreen = (props) => {
    const { products, loading, error } = useSelector(state => state.productList);
    const { loading: loadingCreate, error: errorCreate, product: createdProduct, success: successCreate} = useSelector( state => state.productCreate );
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = useSelector( state => state.productDelete );

    const dispatch = useDispatch();

    useEffect( () => {

        if(successCreate){
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`)   
        }

        if(successDelete){
            dispatch({ type: PRODUCT_DELETE_RESET })
        }
        
        dispatch(listProducts());

    }, [dispatch, props.history, createdProduct, successCreate, successDelete])

    const deleteHandler = (product) => {
        if(window.confirm(`Are You Shure you want to Delete ${product.name}??`)){
            dispatch(deleteProduct(product._id))
        }
    }

    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <div>
            <div className='row'>
                <h1>Product List</h1>
                <button className='primary' type='button' onClick={createHandler}> Create Product </button>
            </div>

            { loadingCreate && <LoadingBox/>}
            { errorCreate && <MessageBox variant='danger' > { errorCreate } </MessageBox>}

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
                                    <th> NAME </th>
                                    <th> PRICE </th>
                                    <th> CATEGORY </th>
                                    <th> BRAND </th>
                                    <th> ACTIONS </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map( p => (
                                        <tr key={p._id}>
                                            <th> {p._id} </th>
                                            <th> {p.name} </th>
                                            <th> {p.price} </th>
                                            <th> {p.category} </th>
                                            <th> {p.brand} </th>
                                            <th>
                                                <button 
                                                    type='button' 
                                                    className='small' 
                                                    onClick={ () => props.history.push(`/product/${p._id}/edit`)}
                                                > Edit 
                                                </button>
                                                <button
                                                    type='button' 
                                                    className='small' 
                                                    onClick={ () => deleteHandler(p)}
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

export default ProductListScreen
