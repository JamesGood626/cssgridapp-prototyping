import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./App.css";
import SidebarController from "./SidebarComponents/SidebarController";
import SubDocument from "./SubDocument";

// React.SFC
// This is where I render a second react app into
// the iframe that's in the App class's render func
const initGridPlayGround = (iFrame, appStore) => {
  ReactDOM.render(
    <Provider store={appStore}>
      <SubDocument />
    </Provider>,
    iFrame.contentWindow.document.getElementById("subDocument")
  );
};

class App extends Component {
  componentDidMount() {
    console.log("THIS IS THE APP STORE: ", this.props.appStore);
    const iFrame = document.getElementById("frame");
    setTimeout(() => {
      if (iFrame.contentWindow.document.readyState === "complete") {
        initGridPlayGround(iFrame, this.props.appStore);
      }
    }, 1000);
  }

  render() {
    return (
      <div className="container">
        <SidebarController />
        <iframe
          id="frame"
          srcDoc="<!DOCTYPE html><html><head></head><body><div id='subDocument'></div></body></html>"
          height="100%"
          width="100%"
        />
      </div>
    );
  }
}

export default App;
