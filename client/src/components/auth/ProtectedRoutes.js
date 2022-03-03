import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  render,
  loggedin,
  pending,
  redirectTo,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (loggedin) {
        let jsx;
        if (render) {
          jsx = render(props);
        } else {
          jsx = <Component {...props} />;
        }

        return jsx;
      } else {
        if (pending) {
          return "pending...";
        } else {
          const to = {
            ...redirectTo,
            state: { next: props.location, ...(redirectTo || {}).state } // The state object can be accessed via this.props.location.state in the redirected-to component. (https://reacttraining.com/react-router/web/api/Redirect)
          };
          return <Redirect to={to} />;
        }
      }
    }}
  />
);


export default ProtectedRoute;
