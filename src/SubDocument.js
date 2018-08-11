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

  shouldResizeElement = (elementBoundingBox, clientX, clientY) => {
    // elementBoundBox's shape:
    // bottom:443
    // left:268
    // right:434
    // top:277
    // if both clientX and clientY are within range allow a resize of height and width
    // if e.clientX is within a range of +/- 3 of left or right, then allow resize of width
    // if e.clientY is within a range of +/- 3 of top or bottom, then allow resize of height
  };

  handleMouseDown = e => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    // console.log("TARGET: ", e.target);
    console.log("Target bounding rect: ", e.target.getBoundingClientRect());
    const targetBoundingBox = e.target.getBoundingClientRect();
    e.target.style.position = "absolute";
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
    if (this.state.mouseDown) {
      console.log("MouseMove clientX: ", e.clientX);
      console.log("MouseMove clientY: ", e.clientY);
      console.log(e.target.offsetLeft);
      console.log(e.target.offsetWidth);

      // Gonna Have to use some maths to maintain the divs position.
      // percentages are the only thing that did work.
      e.target.style.left = "90%";
      // e.target.getBoundingClientRect.right = e.clientX;
      // e.target.style.height = `${e.clientY}px`;
      // e.target.style.width = `${e.clientX}px`;
    }
  };

  // componentDidUpdate() {
  //   console.log("this.props.htmlElements: ", this.props.htmlElements);
  // }

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
