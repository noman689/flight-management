import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '@client/store/auth/types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.app.isAuthenticated,
  );
  const location = useLocation();

  console.log("isAuthenticated",isAuthenticated)

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                props: location.pathname,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
