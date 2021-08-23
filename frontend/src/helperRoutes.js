import React from 'react';
import {Route, Redirect} from 'react-router-dom';




/**
 * Create a public route
 * @param {component, options} param
 */
export const PublicRoute = ({component, ...options})=>{
    return <Route {...options} component={component}/>
} 

/**
 * Create a private route
 * @param {component, options} param
 */
export const PrivateRoute = ({component, ...options})=>{
    console.log(options)
    if(options.auth) return <Route {...options} component={component}/>
    return <Redirect to="/home"/>

} 


/**
 * Create a admin route
param {component, options} param
 */
// export const AdminRoute = ({component, ...options})=>{
//     if(options.isAuth && options.isAdmin)  return <Route {...options} component={component}/>
//     return <Redirect to="/"/>

// } 