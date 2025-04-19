import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { baseTheme } from './common/themes/Theme';

import Home from "./components/Home";

const App = () => {
  return (
    <ThemeProvider theme={baseTheme}>
    <Router>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
