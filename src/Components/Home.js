import {Link} from "react-router-dom"
import {connect} from "react-redux"

function Home(){
  return(
    <div className="home">
      <h2>Welcome to L1ke It</h2>
     <div><Link to="/Movies">Open Search App</Link></div>
    </div>
  )
}

export default connect()(Home);
