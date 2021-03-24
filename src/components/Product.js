import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating.js'

const Product = ({product}) => {
    return (
        <div key={product._id} className="card">
            <div className='card-img'>
                <Link to={`/product/${product._id}`}>
                    <img
                    className="medium"
                    src={product.image}
                    alt={product.name}
                    />
                </Link>
            </div>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                <h2>{product.name}</h2>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
                <div className="price">${product.price}</div>
            </div>
        </div>
    )
}

export default Product
