import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
import Error from '../../Images/error.svg'


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
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


function TV(props) {

    const [TV, setTV] = useState();

    const [Similar, setSimilar] = useState()

    const [Keywords, setKeywords] = useState();

    const [Reveal, setReveal] = useState(7);

    useEffect(() => {
        if (props.match.params.id) {
            fetch(`${API_URL}tv/${props.match.params.id}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setTV(res);
                    document.title = `MovieBox - ${res.name}`;

                })

            // fetch(`${API_URL}tv/${props.match.params.id}/season/1?api_key=${API_KEY}`)
            //     .then(res => res.json())
            //     .then(res => {
            //         console.log(res.episodes)
            //         for (let i in res.episodes) {
            //             console.log(res.episodes[i].guest_stars)

            //         }
            //         // setCast(res.cast)
            //         // for (let i in res.crew) {
            //         //     if (res.crew[i].job === "Director") {
            //         //         setDirector(res.crew[i])
            //         //     }
            //         // }
            //     })

            fetch(`${API_URL}tv/${props.match.params.id}/similar?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {

                    setSimilar(res.results)
                })

            fetch(`${API_URL}tv/${props.match.params.id}/keywords?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    //console.log(res)
                    setKeywords(res.keywords)
                })
        }
    }, []);
    return (
        <div>
            {TV && Similar ?
                <div className="heading-container" style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.85) 100%),url(${IMAGE_URL}/original${TV.backdrop_path}`
                }}>
                    <div className="heading-grid">
                        <div>
                            <img src={`${IMAGE_URL}/w342${TV.poster_path}`} alt="poster" />
                        </div>
                        <div>
                            <h1>{TV.name}</h1>
                            {TV.tagline.length > 0 ? <h2 className="tagline">{TV.tagline}</h2> : <span></span>}
                            <p>{TV.first_air_date} • {TV.genres.map((genre, index) => { return <span key={index}>{genre.name} </span> })} • {TV.runtime} Minutes</p>
                            <h2>Overview</h2>
                            <p>{TV.overview}</p>
                            <h4>Created By <Link to={`/person/${TV.created_by[0].id}`} >{TV.created_by[0].name}</Link></h4>
                            <h4>User Score: <span className="user-score">{TV.vote_average}</span> ({TV.vote_count} voted)</h4>
                        </div>
                    </div>
                </div> :
                <div className="loading-container">Loading</div>}
        </div>
    )
}

export default TV
