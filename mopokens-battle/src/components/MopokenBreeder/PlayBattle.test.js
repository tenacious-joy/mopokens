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

  it('expects div with mopoker list to be displayed', () => {
      const btn = app().find("RaisedButton").find('button');
      btn.simulate('click', { stopPropagation: ()=> undefined });
      const div = app().find("#mopoken");
      expect(div.html()).toBe('<div id="mopoken">grassghost</div>');
  });
});