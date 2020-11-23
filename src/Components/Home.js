import {Link} from "react-router-dom"

function Home(){
  return(
    <div className="container">
      Welcome to the home page
      <p>A description will be added</p>
      <Link to="/Movies">Go to Search App</Link>
    </div>
  )
}

export default Home;
