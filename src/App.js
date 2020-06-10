import React from 'react';
import { Provider } from 'react-redux';
import Box from '@material-ui/core/Box';
import createFleekTheme from '@ui/theme';
import DragableBar from '@shared/components/DragableBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import registerEvents, { fetchConfigInfo } from '@events';

import {
  Route,
  Switch,
  Redirect,
  HashRouter as Router,
} from 'react-router-dom';
import store from './store';
import Auth from './views/Auth';
import Storage from './views/Storage';
import PrivateRoute from './shared/components/PrivateRoute';

registerEvents();
fetchConfigInfo();

const theme = createFleekTheme();

/* TODO: Remove SetUpWD from Final Version */

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh">
        <DragableBar />
        <Router>
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <PrivateRoute path="/storage">
              <Storage />
            </PrivateRoute>
            <Redirect to="/storage" />
          </Switch>
        </Router>
      </Box>
    </ThemeProvider>
  </Provider>
);

export default App;
