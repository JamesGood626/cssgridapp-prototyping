import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.css";
import { addHtmlElement } from "./actions";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: #e04;
`;

const redHeader = {
  color: "red",
  height: "4rem",
  width: "4rem",
  background: "lime",
  margin: "1rem"
};
// Make css grid goodness happen
// Receives htmlElements as props from redux store
class SubDocument extends Component {
  state = {
    mouseDown: false,
    recentTargetBoundingBox: null
  };
  componentDidMount = () => {
    const subDocument = this.subDocumentMainContainer.parentNode.parentNode
      .previousSibling.parentNode.parentNode;
    const subDocumentHead = this.subDocumentMainContainer.parentNode.parentNode
      .previousSibling;
    // I prefer this method
    this.style = document.createElement("style");
    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")
    this.style.appendChild(subDocument.createTextNode(""));

    // Add the <style> element to the page
    subDocumentHead.appendChild(this.style);
    console.log("THE STYLE.SHEET: ", this.style.sheet);
  };

  handleMouseDown = e => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    // console.log("TARGET: ", e.target);
    console.log("Target bounding rect: ", e.target.getBoundingClientRect());
    const targetBoundingBox = e.target.getBoundingClientRect();
    // e.target.style.position = "absolute";
    // console.log("MouseMove clientX: ", e.clientX);
    // console.log("MouseMove clientY: ", e.clientY);
    // Call this.shouldResizeElement and return:
    // "resizeWidth", "resizeHeight", or "resizeWidthAndHeight"
    // to be switched over

    // Use the top, left, right, and bottom values from getBounding Client Rect
    // and subtract subsequent clientX and clientY values from
    this.setState((prevState, state) => ({
      mouseDown: !prevState.mouseDown,
      recentTargetBoundingBox: targetBoundingBox
    }));
  };

  handleMouseUp = e => {
    this.setState((prevState, state) => ({
      mouseDown: !prevState.mouseDown
    }));
  };

  handleMouseMove = e => {
    console.log("the mouse is down: ", this.state.mouseDown);
    if (this.state.mouseDown) {
      console.log("MouseMove clientX: ", e.clientX);
      console.log("MouseMove clientY: ", e.clientY);
      console.log(e.target.offsetLeft);
      console.log(e.target.offsetWidth);

      // This will suffice for resizing...
      e.target.style.width = e.clientX - e.target.offsetLeft + 10 + "px";
      e.target.style.height = e.clientY - e.target.offsetTop + 10 + "px";
    }
  };

  handleMouseOut = e => {
    this.setState({
      mouseDown: false
    });
  };

  renderHtmlElements = () => {
    const keys = Object.getOwnPropertyNames(this.props.htmlElements);
    console.log(keys);
    const elements = keys.map(key => {
      switch (this.props.htmlElements[key].type) {
        case "div":
          return (
            <div id={key} style={redHeader}>
              Rendering div
            </div>
          );
      }
    });
    return elements;
  };
  // What I was rendering before.
  // <div className="container">{this.renderHtmlElements()}</div>;
  render() {
    const styledContainer = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      background: "#e04"
    };
    const styledBlock = {
      height: "10rem",
      width: "10rem",
      background: "#222",
      border: "3px solid #fff"
    };
    return (
      <div
        style={styledContainer}
        ref={x => (this.subDocumentMainContainer = x)}
      >
        <div
          style={styledBlock}
          // className="becomeBlue"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseMove={this.handleMouseMove}
          onMouseOut={this.handleMouseOut}
        />
      </div>
    );
  }
}

function mapStateToProps({ htmlElements }) {
  return { htmlElements };
}

export default connect(
  mapStateToProps,
  { addHtmlElement }
)(SubDocument);
