import './App.css';
import React from "react";
import Routes from "./Routes"
import {Link} from "react-router-dom";


class App extends React.Component {

render(){
  return (
    <div className="App">
    <h1 id="title"><Link to={`/`}>L1ke It</Link></h1>
      <div className="content">
        <Routes/>
      </div>
      <div id="footer">
        <div>Last updated: December 2020</div>
        <div>Created by vLEE</div>
        <div className="sourceCode"><a href="https://github.com/vlee4/Like-It">Source Code</a></div>
      </div>
    </div>
  );
}
}

export default App;
