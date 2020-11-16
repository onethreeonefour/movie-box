import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        partialVisibilityGutter: 40
    }
};

function Movie(props) {

    const [Movie, setMovie] = useState();
    const [Director, setDirector] = useState()
    const [Similar, setSimilar] = useState()
    const [Cast, setCast] = useState();

    useEffect(() => {
        //Fetch movie data from params id
        if (props.match.params.id) {
            fetch(`${API_URL}movie/${props.match.params.id}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setMovie(res);
                })
            fetch(`${API_URL}movie/${props.match.params.id}/credits?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setCast(res.cast)
                    for (let i in res.crew) {
                        if (res.crew[i].job === "Director") {
                            setDirector(res.crew[i])
                        }
                    }

                })

            fetch(`${API_URL}movie/${props.match.params.id}/similar?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setSimilar(res.results)
                })
        }
    }, []);
    console.log(Director)
    return (
        <div>
            {Movie && Director && Similar && Cast ?
                <div className="heading-container" style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.85) 100%),url(${IMAGE_URL}/original${Movie.backdrop_path}`
                }}>
                    <div className="heading-grid">
                        <div>
                            <img src={`${IMAGE_URL}/w342${Movie.poster_path}`} alt="poster" />
                        </div>
                        <div>
                            <h1>{Movie.title}</h1>
                            {Movie.tagline.length > 0 ? <h2 className="tagline">{Movie.tagline}</h2> : <span></span>}
                            <p>{Movie.release_date} • {Movie.genres.map((genre, index) => { return <span key={index}>{genre.name} </span> })} • {Movie.runtime} Minutes</p>
                            <h2>Overview</h2>
                            <p>{Movie.overview}</p>
                            <h4>Directed By <Link to={`/person/${Director.id}`}>{Director.name}</Link></h4>
                            <h4>User Score: <span className="user-score">{Movie.vote_average}</span> ({Movie.vote_count} voted)</h4>
                        </div>
                    </div>
                </div> :
                <div className="loading-container">Loading</div>}
            <div>

            </div>
        </div>

    )
}

export default Movie
