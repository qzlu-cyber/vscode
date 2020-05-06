import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../../services/authService';

const ProtectedRoute = (props) => {
  const { component: Component, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props); //Component可能为空，如果不存在就返回普通保护路由中的render属性
        //普通保护路由
        // <Route
        //     path="/movies"
        //     render={(props) => <Movies {...props} user={user} />}
        // ></Route>
      }}
    ></Route>
  );
};

export default ProtectedRoute;
