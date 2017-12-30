import React from 'react';
import { PropTypes } from 'prop-types';
import { mount } from "enzyme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SelectedMopoken from './SelectedMopoken';

describe("render SelectedMopoken component", () => {
    let props;
    let mountedApp;

  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <SelectedMopoken {...props} />, {
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
    props = {
        disabled: Array(Object.keys(7).length).fill(false),
        mopokens: [
          {type: 'fire',level: 0,disabled: true},
          {type: 'water',level: 0,disabled: true},
          {type: 'grass','level': 0,disabled: true},
          {type: 'ghost',level: 0,disabled: true},
          {type: 'psychic',level: 0,disabled: true}],
        errorOpen: false,
        enableReferenceMopoken: function(idx,mopokens) {
            props.disabled[idx] = false;
            props.mopokens = mopokens;
        }
    }
  });

  it('always renders a div', () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('render selected mopokens as chips', () => {
    const div = app().find("#chipText");
    expect(div.children().length).toBe(5);
  });

  test.only('should delete the selected mopoken chip', () => {
    const chip = app().find("Chip#chip1");
    chip.prop('onRequestDelete')(props.mopokens[1],1);
    app().update();
    expect(app().find("#chipText").children().length).toBe(4);
  });
});