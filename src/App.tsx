import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
import createTypography from '@material-ui/core/styles/createTypography';

import './App.css';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Verification from './pages/Verification';

function App() {

  const palette = createPalette({
    type: 'light',
  });

  const theme = createMuiTheme({
    typography: createTypography(createPalette(palette), {
      fontFamily: '"Lato"',
    })
  });

  const renderPages = (): ReactElement => (
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute path="/signup" component={SignUp} />
      <Route path="/verify" component={Verification} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <div className="app">
        <BrowserRouter>
          {renderPages()}
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
