import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import PrivateRoute from './PrivateRoute';

const RootNavigator = () => {
  const renderElement = (component, auth = false, roles = []) => {
    const Page = component;
    if (auth) {
      return (
        <PrivateRoute roles={roles}>
          <Page />
        </PrivateRoute>
      );
    }
    return <Page />;
  };

  const renderRoute = (route, auth = false) => {
    if (route.child && route.child.length > 0) {
      return (
        <Route
          index={route.index}
          path={route.path}
          element={renderElement(route.component, auth, route?.roles)}
          key={route.name}
        >
          {route.child.map(routeChild => renderRoute(routeChild))}
        </Route>
      );
    }

    return (
      <Route
        index={route.index}
        path={route.path}
        element={renderElement(route.component, auth, route?.roles)}
        key={route.name}
      />
    );
  };

  return (
    <Routes>
      {publicRoutes.map(route => {
        return renderRoute(route);
      })}
      {privateRoutes.map(route => {
        return renderRoute(route, true);
      })}
    </Routes>
  );
};

export default RootNavigator;
