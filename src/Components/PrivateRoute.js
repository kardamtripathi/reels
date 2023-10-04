import React, {useContext} from 'react';
import {AuthContext} from '../Context/AuthContext';
// import {Redirect} from 'react-router';
import {Route, Navigate, Routes, Outlet} from 'react-router-dom';
function PrivateRoute({element: Element, ...rest}) {
  const {user} = useContext(AuthContext)
  return (
        // <Route {...rest} element = {user ? <Component /> : <Navigate to = "/login" />}/>
        // <div>
        //   <Outlet /> {/* Render nested routes */}
        // </div>
        // user ? <Element /> : <Navigate to="/login" />
        user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default PrivateRoute