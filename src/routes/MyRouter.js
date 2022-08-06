/* eslint-disable react/prop-types */
/* eslint-disable react/no-typos */
/* eslint-disable react/jsx-props-no-spreading */

import { useSelector } from 'react-redux';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MyRoute({ component: Component, isClosed, ...rest }) {
  const isLoggendIn = useSelector((state) => state.auth.isLoggedIn);

  if (isClosed && !isLoggendIn) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  return <Route {...rest} component={Component} />;
}

MyRoute.defaultProps = {
  isClosed: false,
};

MyRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isClosed: PropTypes.bool,
};
