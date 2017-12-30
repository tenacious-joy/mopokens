import React from 'react';
import { PropTypes } from 'prop-types';
import { mount } from "enzyme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyProgress from './MyProgress';

describe("render myProgress component", () => {
    let props;
    let mountedApp;

  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <MyProgress />, {
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

  it('renders breeder\'s progress over mopoken types and levels', () => {
    const div = app().find("#mopoken");
    expect(div.children().length).toBe(8);
  });

  it('mopoken type buttons should be disabled on click', () => {
    const btn = app().find("FlatButton#btn1").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn1").prop('disabled')).toBe(true);
  });

  it('selectedmopoken should be rendered', () => {
    const selectedMopoken = app().find("SelectedMopoken");
    expect(selectedMopoken.length).toBe(1);
  });

  it('reference button should be enabled if the selected mopoken is deleted', () => {
    const mopoken = {
      type: 'water',
      level: 0,
      disabled: true
    }
    const selectedMopoken = app().find("SelectedMopoken");
    selectedMopoken.prop('enableReferenceMopoken')(mopoken);

    const btn = app().find("FlatButton#btn1");
    expect(btn.prop('disabled')).toBe(false);
  });

  it('render selected mopokens as chips', () => {
    const btn = app().find("FlatButton#btn1").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });

    const btn1 = app().find("FlatButton#btn2").find('button');
    btn1.simulate('click', { stopPropagation: ()=> undefined });

    const btn2 = app().find("FlatButton#btn3").find('button');
    btn2.simulate('click', { stopPropagation: ()=> undefined });

    const selectedMopokensDiv = app().find("div#chipText");
    expect(selectedMopokensDiv.children().length).toBe(3);
  });

  it('should not let the user to choose more than one type of mopoken', () => {
    const btn = app().find("FlatButton#btn1").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });

    const btn1 = app().find("FlatButton#btn1").find('button');
    btn1.simulate('click', { stopPropagation: ()=> undefined });

    const selectedMopokensDiv = app().find("div#chipText");
    expect(selectedMopokensDiv.children().length).toBe(1);
  });

  it('should not let the user to choose more than 5 mopokens', () => {
    const btn = app().find("FlatButton#btn1").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });

    const btn1 = app().find("FlatButton#btn2").find('button');
    btn1.simulate('click', { stopPropagation: ()=> undefined });

    const btn2 = app().find("FlatButton#btn3").find('button');
    btn2.simulate('click', { stopPropagation: ()=> undefined });

    const btn3 = app().find("FlatButton#btn4").find('button');
    btn3.simulate('click', { stopPropagation: ()=> undefined });

    const btn4 = app().find("FlatButton#btn5").find('button');
    btn4.simulate('click', { stopPropagation: ()=> undefined });

    const btn5 = app().find("FlatButton#btn6").find('button');
    btn5.simulate('click', { stopPropagation: ()=> undefined });

    const selectedMopokensDiv = app().find("div#chipText");
    expect(selectedMopokensDiv.children().length).toBe(5);
  });

  it('should display error message if the user chooses more than 5 mopokens', () => {
    const btn = app().find("FlatButton#btn1").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });

    const btn1 = app().find("FlatButton#btn2").find('button');
    btn1.simulate('click', { stopPropagation: ()=> undefined });

    const btn2 = app().find("FlatButton#btn3").find('button');
    btn2.simulate('click', { stopPropagation: ()=> undefined });

    const btn3 = app().find("FlatButton#btn4").find('button');
    btn3.simulate('click', { stopPropagation: ()=> undefined });

    const btn4 = app().find("FlatButton#btn5").find('button');
    btn4.simulate('click', { stopPropagation: ()=> undefined });

    const btn5 = app().find("FlatButton#btn6").find('button');
    btn5.simulate('click', { stopPropagation: ()=> undefined });

    const snackBar = app().find("CustomSnackBar");
    expect(snackBar.length).toBe(1);
  });
});