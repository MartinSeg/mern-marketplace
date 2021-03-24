import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {

    const { userInfo } = useSelector(state => state.userSignIn);

    return (
        <Route 
            {...rest}
            render = { props => userInfo && userInfo.isAdmin
                ? <Component {...props}/>
                : <Redirect to='/signin'/>
            }
        >
        </Route>
    )
}

export default AdminRoute