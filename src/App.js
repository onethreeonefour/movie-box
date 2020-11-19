import NavBar from './Components/Navigation/Navbar';
import Footer from './Components/Navigation/Footer';
import Landing from './Components/Landing/Landing'
import Movie from './Components/Movie/Movie';
import TV from './Components/TV/TV';
import TVSeason from './Components/TV/TVSeason';
import TVEpisode from './Components/TV/TVEpisode';
import Person from './Components/Person/Person';
import Search from './Components/Search/Search';
import { Switch, Route } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";

function App() {
  return (
    <>
      <SimpleReactLightbox>
        <NavBar />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/movie/:id" component={Movie} />
            <Route exact path="/tv/:id" component={TV} />
            <Route exact path="/tv/:id/:title/season/:seasonId" component={TVSeason} />
            <Route exact path="/tv/:id/:title/season/:seasonNumber/episode/:episodeNumber" component={TVEpisode} />
            <Route exact path="/person/:id" component={Person} />
            <Route exact path="/search/:query" component={Search} />
          </Switch>
        </div>
        <Footer />
      </SimpleReactLightbox>
    </>
  );
}

export default App;
