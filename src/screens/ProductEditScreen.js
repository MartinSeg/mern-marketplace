import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET, PRODUCT_DETAILS_RESET } from '../constants/productConstants';

const ProductEditScreen = (props) => {

    const productId = props.match.params.id
    const dispatch = useDispatch();
    const {userInfo} = useSelector( state => state.userSignIn)
    const {product, loading, error} = useSelector( state => state.productDetails);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = useSelector( state => state.productUpdate);

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState('')

    useEffect( () => {

        if(successUpdate){
            dispatch({ type: PRODUCT_UPDATE_RESET })
            dispatch({ type: PRODUCT_DETAILS_RESET })
            props.history.push('/productlist')
        }

        if(!product || (product._id !== productId) ){
            dispatch(detailsProduct(productId))
        }else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setBrand(product.brand)
            setDescription(product.description)
        }

    }, [dispatch, productId, product, props.history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({ _id: productId, name, price, image, category, countInStock, brand, description}))
    }

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);

        try{
            const { data } = await axios.post(
                '/api/uploads', 
                bodyFormData, 
                { headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userInfo.token}`
                }}
            );

            setImage(data)
            setLoadingUpload(false);

        }catch(err){
            setErrorUpload(err.message)
            setLoadingUpload(false);
        }
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Edit Product {productId} </h1>
                </div>
                { loadingUpdate && <LoadingBox /> }
                { errorUpdate && <MessageBox variant='danger'> {errorUpdate} </MessageBox>}
                { loading 
                    ? <LoadingBox/> 
                    : error 
                        ? <MessageBox variant='danger'> { error } </MessageBox>
                        :<>
                            <div>
                                <label htmlFor='name'> Name </label>
                                <input id='name' type='text' value={name} placeholder='Enter Name' onChange={ e => setName(e.target.value) } />
                            </div>

                            <div>
                                <label htmlFor='price'> Price </label>
                                <input id='price' type='text' value={price} placeholder='Enter Price' onChange={ e => setPrice(e.target.value) } />
                            </div>

                            <div>
                                <label htmlFor='image'> Image </label>
                                <input id='image' type='text' value={image} placeholder='Enter Image' onChange={ e => setImage(e.target.value) } />
                            </div>

                            <div>
                                <label htmlFor='imageFile'> Image File </label>
                                <input id='imageFile' type='file' placeholder='Choose Image' onChange={ uploadFileHandler } />
                                { loadingUpload && <LoadingBox />}
                                { errorUpload && <MessageBox variat='danger'> { errorUpload } </MessageBox>}
                            </div>

                            <div>
                                <label htmlFor='category'> Category </label>
                                <input id='category' type='text' value={category} placeholder='Enter Category' onChange={ e => setCategory(e.target.value) } />
                            </div>

                            <div>
                                <label htmlFor='countInStock'> Count In Stock </label>
                                <input id='countInStock' type='text' value={countInStock} placeholder='Enter Count In Stock' onChange={ e => setCountInStock(e.target.value) } />
                            </div>

                            <div>
                                <label htmlFor='brand'> Brand </label>
                                <input id='brand' type='text' value={brand} placeholder='Enter Brand' onChange={ e => setBrand(e.target.value) } />
                            </div>

                            <div>
                                <label htmlFor='description'> Description </label>
                                <textarea id='description' type='text' value={description} placeholder='Enter Description' onChange={ e => setDescription(e.target.value) } />
                            </div>

                            <div>
                                <label></label>
                                <button tpe='submit' className='primary' >
                                    Update
                                </button>
                            </div>
                        </>
                }
            </form>
        </div>
    )
}

export default ProductEditScreen
