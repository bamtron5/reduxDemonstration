import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import { App } from '../index';
import { HomePage } from './../../Home';
import { ModalRoot } from './../ModalRoot';

import { Switch, Route, Router } from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let renderedComponent: Enzyme.ShallowWrapper;
  let numberOfRoutes = 1;

  beforeEach(() => {
    renderedComponent = Enzyme.shallow(
      <App />
    );
    // console.log(renderedComponent.debug());
  });

  it('should exist', () => {
    expect(renderedComponent).toBeTruthy();
  });

  it(`it contains ${numberOfRoutes} route${numberOfRoutes > 1 || 0 ? 's' : ''}`, () => {
    expect(renderedComponent.find(Route)).toHaveLength(numberOfRoutes);
  });

  it(`it contains the home route`, () => {
    expect(
      renderedComponent
        .find(Route)
        .at(0)
        .props()
        .component.WrappedComponent
    )
    .toEqual(HomePage);

    expect(
      renderedComponent
        .find(Route)
        .at(0)
        .props()
        .path
    )
    .toEqual('/');
  });

  it('it contains the ModalRoot', () => {
    expect(renderedComponent.contains(
      <ModalRoot id="modalRoot"/>
    )).toBe(true);
  });
});
