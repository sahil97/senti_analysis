import React from "react";
import "./Nav.css";
import { Navbar } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Nav = props => (
  <Navbar className="cnav" variant="dark">
    <Navbar.Brand href="#home">
      {props.hashtag ? (
        <p className="hashtag">{props.hashtag}</p>
      ) : (
        <p className="hashtag">#hashtag</p>
      )}
    </Navbar.Brand>
    <a href="/" className="ml-auto back-btn">
      <FaArrowAltCircleLeft /> Back to search
    </a>
  </Navbar>
);

export default Nav;
