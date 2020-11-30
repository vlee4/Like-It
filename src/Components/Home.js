import {Link} from "react-router-dom"
import {connect} from "react-redux"

function Home(){
  return(
    <div className="home">
      Welcome to the home page
     <div><Link to="/Movies">Go to Search App</Link></div>
    </div>
  )
}

export default connect()(Home);
