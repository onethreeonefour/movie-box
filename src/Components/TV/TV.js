import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Link } from 'react-router-dom';
import Blank from '../../Images/404.png'

function TV(props) {

    const [TV, setTV] = useState();

    const [Similar, setSimilar] = useState();


    useEffect(() => {
        if (props.match.params.id) {
            fetch(`${API_URL}tv/${props.match.params.id}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setTV(res);
                    document.title = `MovieBox - ${res.name}`;
                })

            fetch(`${API_URL}tv/${props.match.params.id}/similar?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setSimilar(res.results)
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
                            <p>{TV.first_air_date} • {TV.genres.map((genre, index) => { return <span key={index}>{genre.name} </span> })}</p>
                            <h2>Overview</h2>
                            <p>{TV.overview}</p>
                            {TV.created_by.length > 0 ? <h4>Created By <Link to={`/person/${TV.created_by[0].id}`} >{TV.created_by[0].name}</Link></h4> : <span></span>}
                            <h4>User Score: <span className="user-score">{TV.vote_average}</span> ({TV.vote_count} voted)</h4>
                            <h4>Seasons : {TV.seasons.length}</h4>
                        </div>
                    </div>
                </div> :
                <div className="loading-container"><h1>Loading</h1></div>}
            <div className="season-container">
                {TV ? TV.seasons.map((season, index) => {
                    return <a href={`/tv/${props.match.params.id}/${TV.name}/season/${season.season_number}`} key={index}>
                        <div className="season-card">
                            <h2>{season.name}</h2>
                            {season.poster_path === null ? <img src={Blank} alt="season"></img> : <img src={`${IMAGE_URL}/w342${season.poster_path}`} alt="season"></img>}
                        </div>
                    </a>
                }) : <span></span>}

            </div>
        </div>
    )
}

export default TV
