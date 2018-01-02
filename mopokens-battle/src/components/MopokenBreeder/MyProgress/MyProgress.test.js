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

  it('selectedmopoken should be rendered', () => {
    const selectedMopoken = app().find("SelectedMopoken");
    expect(selectedMopoken.length).toBe(1);
  });

  xit('reference btn 1 should remain disabled if bt2 is selected, deleted and selected again', () => {
    
    // Select btn 0 & 1 (Fire and water)
    const btn = app().find("FlatButton#btn0").find('button');
    console.log(btn.debug());
    btn.simulate('click', { stopPropagation: ()=> undefined });

    // const btn1 = app().find("FlatButton#btn1").find('button');
    // console.log(btn1.debug());
    // btn1.simulate('click', { stopPropagation: ()=> undefined });

   // app().update();

    // Test if 2 chips are rendered
    const selectedMopokensDiv = app().find("div#chipText");
    expect(selectedMopokensDiv.children().length).toBe(1);
    
    // Test if the added buttons (fire & water) are disabled
    expect(btn.prop('disabled')).toBe(true);
  //  expect(btn1.prop('disabled')).toBe(true);

    // Deleting a chip would invoke a method in enableReferenceMopoken. Here water is deleted
    const mopoken = {
      type: 'water',
      level: 0,
      disabled: true
    }
    const selectedMopoken = app().find("SelectedMopoken");
    selectedMopoken.prop('enableReferenceMopoken')(mopoken);

    // Test if water is enabled and fire should remain disabled
  //  expect(btn1.prop('disabled')).toBe(false);
    expect(btn.prop('disabled')).toBe(true);

 //   btn1.simulate('click', { stopPropagation: ()=> undefined });
   // expect(btn1.prop('disabled')).toBe(true);
    expect(btn.prop('disabled')).toBe(true);
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
});

describe("Test reference button clicks and disabled property", () => {
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

  it('fire should be disabled on click', () => {
    const btn = app().find("FlatButton#btn0").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn0").prop('disabled')).toBe(true);
  });

  it('water should be disabled on click', () => {
    const btn = app().find("FlatButton#btn1").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn1").prop('disabled')).toBe(true);
  });

  it('grass should be disabled on click', () => {
    const btn = app().find("FlatButton#btn2").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn2").prop('disabled')).toBe(true);
  });

  it('electric should be disabled on click', () => {
    const btn = app().find("FlatButton#btn3").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn3").prop('disabled')).toBe(true);
  });

  it('psychic should be disabled on click', () => {
    const btn = app().find("FlatButton#btn4").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn4").prop('disabled')).toBe(true);
  });

  it('ghost should be disabled on click', () => {
    const btn = app().find("FlatButton#btn5").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn5").prop('disabled')).toBe(true);
  });

  it('fighting should be disabled on click', () => {
    const btn = app().find("FlatButton#btn6").find('button');
    btn.simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn6").prop('disabled')).toBe(true);
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
});

describe('fire should remain disabled if water is selected, deleted and selected again', () => {
  let props;
  let mountedApp;

  beforeEach(() => {
    mountedApp = undefined;
  });

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

  it('fire should be disabled on click', () => {
    app().find("FlatButton#btn0").find('button').simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn0").prop('disabled')).toBe(true);
  });

  it('water should be disabled on click', () => {
    app().find("FlatButton#btn1").find('button').simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn1").prop('disabled')).toBe(true);
  });

  it('water should be enabled on deleting it from chip list and fire shoud remain disabled', () => {
    app().find("FlatButton#btn0").find('button').simulate('click', { stopPropagation: ()=> undefined });
    app().find("FlatButton#btn1").find('button').simulate('click', { stopPropagation: ()=> undefined });
    expect(app().find("FlatButton#btn1").prop('disabled')).toBe(true);
    const mopoken = {
      type: 'water',
      level: 0,
      disabled: true
    }
    const selectedMopoken = app().find("SelectedMopoken");
    selectedMopoken.prop('enableReferenceMopoken')(mopoken);
    app().update();
    expect(app().find("FlatButton#btn1").prop('disabled')).toBe(false);
    expect(app().find("FlatButton#btn0").prop('disabled')).toBe(true);
  });
});

describe('mopoken validation', () => {
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