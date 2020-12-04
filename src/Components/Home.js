import {Link} from "react-router-dom"
import {connect} from "react-redux"

function Home(){
  return(
    <div className="home">
      <h1>Welcome to L1ke It</h1>
     <div className="openApp"><Link to="/Movies">Open Search App</Link></div>
     <div className="shade-box">
    <div className="shade"></div>
    </div>
    </div>
  )
}

export default connect()(Home);

