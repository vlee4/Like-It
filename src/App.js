import './App.css';
import React from "react";
import Routes from "./Routes"
import {Link} from "react-router-dom";


class App extends React.Component {

render(){
  return (
    <div className="App">
    <Link id="title" to={`/`}><h1 >Like 1t</h1></Link>
      <div className="content">
        <Routes/>
      </div>
      <div id="footer">
        <div>Last updated: November 2020</div>
        <div>Created by vLEE</div>
        <div><a href="https://github.com/vlee4/Like-It">Source Code</a></div>
      </div>
    </div>
  );
}
}

export default App;
