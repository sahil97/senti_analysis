import React from "react";
import "./PopList.css";

const popList = props => (
  <div>
    <ul>
      <li onClick={props.clicked}>India</li>
      <li onClick={props.clicked}>Modi</li>
      <li onClick={props.clicked}>Congress</li>
      <li onClick={props.clicked}>Trump</li>
    </ul>
  </div>
);

export default popList;
