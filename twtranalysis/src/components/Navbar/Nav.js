import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Nav = props => (
  <Navbar className="cnav" variant="dark">
    <Navbar.Brand href="#home">
      {props.hashtag ? (
        <p className="hashtag">{"#" + props.hashtag}</p>
      ) : (
        <p className="hashtag">#hashtag</p>
      )}
    </Navbar.Brand>
    <Link to="/" className="ml-auto back-btn">
      <FaArrowAltCircleLeft /> Back to search
    </Link>
  </Navbar>
);

export default Nav;
