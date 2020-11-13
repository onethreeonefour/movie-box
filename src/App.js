import NavBar from './Components/Navigation/Navbar';
import Footer from './Components/Navigation/Footer';
import Landing from './Components/Landing/Landing'
import { Switch, Route } from "react-router-dom"

function App() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
