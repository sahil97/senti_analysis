import React from "react";
import "./main-wrapper.css";

const mainWrapper = () => (
  <div className="main-wrapper">
    <div className="twitter-logo">
      <img className="img-responsive" src="/twtr.png" alt="Twitter-Logo"></img>
    </div>
    <div className="wrapper">
      <div className="text-block">
        <h1>NLP analysis of Tweets</h1>
        <p> Built using React, D3, Tensorflow, Flask.</p>
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          maxlength="25"
          id="Hashtag"
          class="form-control form-control-lg"
          placeholder="type #Hashtag to search"
        />
        <div className="search"></div>
      </div>
    </div>
  </div>
);

export default mainWrapper;
