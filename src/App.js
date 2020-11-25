import './App.css';
import React from "react";
import Routes from "./Routes"


class App extends React.Component {

render(){
  return (
    <div className="App">
      <h1 id="title">Like 1t</h1>
      <div className="content">
        <Routes/>
      </div>
    </div>
  );
}
}

export default App;
