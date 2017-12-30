import React from 'react';
import { PropTypes } from 'prop-types';
import { mount } from "enzyme";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CustomSnackBar from './CustomSnackBar';

describe("render CustomSnackBar component", () => {
    let props;
    let mountedApp;

  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <CustomSnackBar { ...props } />, {
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

  const error = {
    backgroundColor: '#E4153C',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: '18px',
    width: '50pc',
  }

  const success = {
    backgroundColor: '#00AB84',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: '18px',
    width: '50pc',
  }

  beforeEach(() => {
    mountedApp = undefined;
    props = {
        open: false,
        message: 'test'
    }
  });

  const getProps = (type) => {
    if (type === 'error') {
        props = {
            type: 'error',
            timeout: 3000,
            message: 'Delete a mopoken to add a new one',
            open: true
        }
    } else {
        props = {
            type: 'success',
            timeout: 3000,
            message: 'Your mopokens are added',
            open: true
        }
    }
  }

  it('always renders a div', () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('should render error snackbar with given message', () => {
    getProps('error');
    const snackbar = app().find("Snackbar");
    expect(snackbar.props().autoHideDuration).toBe(props.timeout);
    expect(snackbar.props().message).toBe(props.message);
    expect(snackbar.props().open).toBe(props.open);
    expect(snackbar.props().bodyStyle).toEqual(error);
  });

  it('should render success snackbar with given message', () => {
    getProps('success');
    const snackbar = app().find("Snackbar");
    expect(snackbar.props().autoHideDuration).toBe(props.timeout);
    expect(snackbar.props().message).toBe(props.message);
    expect(snackbar.props().open).toBe(props.open);
    expect(snackbar.props().bodyStyle).toEqual(success);
  });

  it('should not render snackbar', () => {
    const snackbar = app().find("Snackbar");
    expect(snackbar.props().autoHideDuration).toBe(null);
    expect(snackbar.props().message).toBe(props.message);
    expect(snackbar.props().open).toBe(props.open);
    expect(snackbar.props().bodyStyle).toEqual(success);
  });

});