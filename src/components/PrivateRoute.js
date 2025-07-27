// frontend/src/components/PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import auth from '../services/auth';

// const PrivateRoute = ({ element: Element, adminOnly = false, ...rest }) => {
//   const user = auth.getCurrentUser();
  
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
  
//   if (adminOnly && !auth.isAdmin()) {
//     return <Navigate to="/" replace />;
//   }
  
//   return <Element {...rest} />;
// };

// export default PrivateRoute;
// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import auth from '../services/auth';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const user = auth.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !auth.isAdmin()) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default PrivateRoute;