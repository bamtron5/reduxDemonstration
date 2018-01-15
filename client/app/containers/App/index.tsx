import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import AppWrapper from './AppWrapper';
import HomePage from './../Home';
import ModalRoot from './ModalRoot';

// CSS
const normalize = require('normalize.css');

export function checkSession() {
  const hasSession = sessionStorage.getItem('session_id');
  !hasSession ? createSession() : () => null;
}

export function createSession() {
  const id = new Date().getTime().toString();
  sessionStorage.setItem('session_id', id);
}

export function getSession(key: string): string {
  return sessionStorage.getItem(key);
}

export function setSession(key: string, value: string) {
  sessionStorage.setItem(key, value);
}

export function clearSession() {
  sessionStorage.clear();
}

export function App() {
  checkSession();
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
      <ModalRoot id="modalRoot"/>
    </AppWrapper>
  );
}

export default App;
