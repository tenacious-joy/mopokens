import React from 'react';
import { PropTypes } from 'prop-types';
import { mount } from "enzyme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PlayBattle from './PlayBattle';

describe("render playbattle component", () => {
    let props;
    let mountedApp;

  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <PlayBattle />, {
            context: {
                muiTheme: getMuiTheme(),
              },
              childContextTypes: {
                muiTheme: PropTypes.object.isRequired,
              }
        }
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    mountedApp = undefined;
  });

  it('always renders a div', () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('renders raised button on render', () => {
    const button = app().find("RaisedButton");
    expect(button.length).toBe(1);
  });
});

describe("playBattle", () => {
  let props;
    let mountedApp;

  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <PlayBattle />, {
            context: {
                muiTheme: getMuiTheme(),
              },
              childContextTypes: {
                muiTheme: PropTypes.object.isRequired,
              }
        }
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    mountedApp = undefined;
  });

  const playBattle = () => {
    const btn = app().find("RaisedButton#playBattle").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
  }

  it('renders breeder\'s progress over mopoken types and levels', () => {
    const btn = app().find("RaisedButton#playBattle").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("MyProgress").length).toBe(1);
  });
});