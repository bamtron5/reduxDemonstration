import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import HomePage from './../Home';

export function App() {
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - SA Project"
        defaultTitle="SA Project"
      >
        <meta name="description" content="Project for SA" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </AppWrapper>
  );
}

export default App;
