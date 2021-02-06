import React, { useEffect } from 'react'
import Product from '../components/Product.js'
import LoadingBox from '../components/LoadingBox.js'
import MessageBox from '../components/MessageBox.js'
import { listProducts } from '../actions/productActions.js'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList );
    const { loading, error, products } = productList;

    useEffect( () => {
        dispatch(listProducts());
    }, [])

    return (
        <div>
            {loading
                ? <LoadingBox />
                : error
                    ? <MessageBox variant='danger'>{error}</MessageBox>
                    : <div className="row center">
                        {products.map((product) => (
                            <Product product={product} key={product._id} />
                        ))}
                    </div>
            }
        </div>
    )
}

export default HomeScreen
