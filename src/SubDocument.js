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

    // WebKit hack :(
    this.style.appendChild(subDocument.createTextNode(""));

    // Add the <style> element to the page
    subDocumentHead.appendChild(this.style);
    console.log("THE STYLE.SHEET: ", this.style.sheet);
  };

  handleMouseDown = e => {
    console.log("TARGET: ", e.target);
    console.log("Target bounding rect: ", e.target.getBoundingClientRect());
  };

  handleMouseMove = e => {
    // console.log("MouseMove clientX: ", e.clientX);
    // console.log("MouseMove clientY: ", e.clientY);
  };

  componentDidUpdate() {
    console.log("this.props.htmlElements: ", this.props.htmlElements);
  }

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
          className="becomeBlue"
          onMouseDown={this.handleMouseDown}
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
