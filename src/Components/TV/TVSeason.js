import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Blank from '../../Images/404.png'
import { Link } from 'react-router-dom';
import TV from './TV';

function TVSeason(props) {
    const [Episodes, setEpisodes] = useState();
    const [Detail, setDetail] = useState();
    useEffect(() => {
        if (props.match.params.id) {
            fetch(`${API_URL}tv/${props.match.params.id}/season/${props.match.params.seasonId}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    // setTV(res);
                    // document.title = `MovieBox - ${res.name}`;
                    console.log(res)
                    setDetail(res)
                })
        }
    }, []);
    return (
        <div>
            {Detail ?
                <div className="heading-container" style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.925) 0%, rgba(0,0,0,0.8) 100%),url(${IMAGE_URL}/original${Detail.poster_path}`
                }}>
                    <div className="heading-grid">
                        <div>
                            <img src={`${IMAGE_URL}/w342${Detail.poster_path}`} alt="poster" />
                        </div>
                        <div>
                            <h1>{props.match.params.title}</h1>
                            <h2>{Detail.name}</h2>
                            <p>Air Date: {Detail.air_date}</p>
                            {Detail.overview.length > 0 ?
                                <div>
                                    <h2>Overview</h2>
                                    <p>{Detail.overview}</p>
                                </div>
                                : <span></span>}
                        </div>
                    </div>
                </div> :
                <div className="loading-container">Loading</div>}
            <div className="season-episode-container">
                <h1>Episodes</h1>
                {Detail ?
                    <div>
                        {Detail.episodes.map((episode, index) => {
                            return <a href={`/TV/${props.match.params.id}/episode/${episode.id}`} key={index}>
                                <div className="season-episode-card">
                                    <div>
                                        <img src={`${IMAGE_URL}/w300${episode.still_path}`} alt="still" />
                                        <h4>{episode.name}</h4>
                                    </div>
                                    <div>
                                        <h4>Overview</h4>
                                        <p>{episode.overview}</p>
                                        <p>({episode.air_date})</p>
                                        <h5>User Score: <span className="user-score">{episode.vote_average.toFixed(1)}</span> ({episode.vote_count} voted)</h5>
                                    </div>
                                </div>

                            </a>
                        })}
                    </div>

                    : <span></span>}
            </div>
        </div>
    )
}

export default TVSeason
