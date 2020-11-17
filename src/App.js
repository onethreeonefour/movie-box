import NavBar from './Components/Navigation/Navbar';
import Footer from './Components/Navigation/Footer';
import Landing from './Components/Landing/Landing'
import Movie from './Components/Movie/Movie';
import TV from './Components/TV/TV';
import { Switch, Route } from "react-router-dom"

function App() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/movie/:id" component={Movie} />
          <Route exact path="/tv/:id" component={TV} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
