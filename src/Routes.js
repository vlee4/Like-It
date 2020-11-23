import React from "react";
import {connect} from "react-redux";
import {withRouter, Route, Switch} from "react-router-dom";

// import {App, Details} from "./Components"
// import App from "./App";
// import Results from "./Components/Results";
import Details from "./Components/Details";
import Search from "./Components/Search";
import Home from "./Components/Home";

function Routes() {
  return (
    <Switch>
      <Route exact path="/Movies/:movieId" component={Details}/>
      <Route path="/Movies" component={Search}/>
      <Route path="/" component={Home}/>
    </Switch>
  )
}

export default withRouter(connect()(Routes))
