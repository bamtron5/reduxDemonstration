import * as React from 'react';
const createDevTools = require('redux-devtools').createDevTools;
const LogMonitor = require('redux-devtools-log-monitor').default;
const DockMonitor = require('redux-devtools-dock-monitor').default;

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
    changePositionKey='ctrl-q'
    defaultIsVisible={true}>
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);