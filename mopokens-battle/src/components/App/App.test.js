import React from 'react';
import { mount } from "enzyme";
import App from './App';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe("RenderAppHomePage", () => {
  let props;
  let mountedApp;

  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <App { ...props } />
      );
    }
    return mountedApp;
  }

  beforeEach(() => {
    props = {
      welcome: true
    };
    mountedApp = undefined;
  });

  it('always renders a div', () => {
    const divs = app().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it('always renders a header', () => {
    const header = app().find("header");
    expect(header.children().length).toBe(2);
  });

  it("renders paragraph if welcome props is true", () => {
    const p = app().find("p");
    expect(p.length).toBe(1);
  });

  it("should not render paragraph if welcome props is false/undefined", () => {
    props = {
      welcome: false
    };
    const p = app().find("p");
    expect(p.length).toBe(0);
  });

  it("should render playbattle wrapped by mui", () => {
    const component = app().find("MuiThemeProvider");
    const playButton = app().find("PlayBattle");

    expect(component.children().length).toBe(playButton.length);
  });

});
