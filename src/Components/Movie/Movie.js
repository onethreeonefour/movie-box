import React, { useState, useEffect } from "react";
import { API_URL, API_KEY, IMAGE_URL } from "../../Config";
import Error from "../../Images/error.svg";
import Blank from "../../Images/404.png";

function Movie(props) {
  const [Movie, setMovie] = useState();
  const [Director, setDirector] = useState();
  const [Similar, setSimilar] = useState();
  const [Cast, setCast] = useState();
  const [Keywords, setKeywords] = useState();

  const [Reveal, setReveal] = useState(7);

  useEffect(() => {
    //Fetch movie data from params id
    if (props.match.params.id) {
      fetch(`${API_URL}movie/${props.match.params.id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          setMovie(res);
          document.title = `MovieBox - ${res.title}`;
        });
      fetch(`${API_URL}movie/${props.match.params.id}/credits?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          //console.log(res)
          setCast(res.cast);
          for (let i in res.crew) {
            if (res.crew[i].job === "Director") {
              setDirector(res.crew[i]);
            }
          }
        });

      fetch(`${API_URL}movie/${props.match.params.id}/similar?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          setSimilar(res.results);
        });

      fetch(`${API_URL}movie/${props.match.params.id}/keywords?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
          setKeywords(res.keywords);
        });
    }
  }, []);

  const revealMore = () => {
    if (Cast.length > Reveal) {
      setReveal(Reveal + 8);
    }
  };

  return (
    <div>
      {Movie && Director && Similar && Cast ? (
        <div
          className="heading-container"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.85) 100%),url(${IMAGE_URL}/original${Movie.backdrop_path}`,
          }}
        >
          <div className="heading-grid-wrapper">
            <div className="heading-grid">
              <div>
                {Movie.poster_path !== null ? (
                  <img src={`${IMAGE_URL}/w342${Movie.poster_path}`} alt="poster" />
                ) : (
                  <img src={Blank} alt="poster"></img>
                )}
              </div>
              <div>
                <h1>{Movie.title}</h1>
                {Movie.tagline.length > 0 ? <h2 className="tagline">{Movie.tagline}</h2> : <span></span>}
                <p>
                  {Movie.release_date} •{" "}
                  {Movie.genres.map((genre, index) => {
                    return <span key={index}>{genre.name} </span>;
                  })}{" "}
                  • {Movie.runtime} Minutes
                </p>
                <h2>Overview</h2>
                <p>{Movie.overview}</p>
                <h4>
                  Directed By <a href={`/person/${Director.id}`}>{Director.name}</a>
                </h4>
                <h4>
                  User Score: <span className="user-score">{Movie.vote_average}</span> ({Movie.vote_count} voted)
                </h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <h1>Loading</h1>
        </div>
      )}
      {Movie && Director && Similar && Keywords && Cast ? (
        <div className="movie-info-wrapper">
          <div className="movie-info-grid">
            <div>
              <h1>Movie Information </h1>
              <p>Budget: {Movie.budget.toFixed(2)}</p>
              <p>Revenue: {Movie.revenue.toFixed(2)}</p>
              <p>Status: {Movie.status}</p>
              {Movie.spoken_languages.length > 0 ? <p>Language: {Movie.spoken_languages[0].name}</p> : <span></span>}

              <p>
                Popularity: <span className="user-score">{Movie.popularity.toFixed(1)}</span>
              </p>
              <h2>Keywords</h2>
              {Keywords.map((words, index) => {
                return (
                  <div className="keyword-grid" key={index}>
                    <p className="chip">{words.name}</p>
                  </div>
                );
              })}
            </div>
            <div className="cast-grid">
              <a href={`/person/${Director.id}`}>
                {Director.profile_path !== null ? (
                  <img src={`${IMAGE_URL}/w185${Director.profile_path}`} alt="director"></img>
                ) : (
                  <img src={Error} className="error" alt="cast"></img>
                )}
                <h4>Director</h4>
                <p>{Director.name}</p>
              </a>
              {Cast && Cast.length > 8
                ? Cast.slice(0, Reveal).map((cast, index) => {
                    return (
                      <a href={`/person/${cast.id}`} key={index}>
                        {cast.profile_path !== null ? (
                          <img src={`${IMAGE_URL}/w185${cast.profile_path}`} alt="cast"></img>
                        ) : (
                          <img src={Error} className="error" alt="cast"></img>
                        )}
                        <h4>{cast.character}</h4>
                        <p>{cast.name}</p>
                      </a>
                    );
                  })
                : Cast.map((cast, index) => {
                    <a href={`/person/${cast.id}`} key={index}>
                      {cast.profile_path !== null ? (
                        <img src={`${IMAGE_URL}/w185${cast.profile_path}`} alt="cast"></img>
                      ) : (
                        <img src={Error} className="error" alt="cast"></img>
                      )}
                      <h4>{cast.character}</h4>
                      <p>{cast.name}</p>
                    </a>;
                  })}
              <button className="show-more" onClick={() => revealMore()}>
                Show More
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
      <div className="similar-movies-container">
        <h1 style={{ padding: "1rem 0" }}>More Like This</h1>
        {Similar ? (
          <div className="similar-movies-card">
            {Similar.map((movie, index) => {
              return (
                <a href={`/movie/${movie.id}`} key={index}>
                  <div>
                    <img src={`${IMAGE_URL}/w342${movie.poster_path}`}></img>
                    <h4>{movie.title}</h4>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}

export default Movie;
