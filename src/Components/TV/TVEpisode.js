import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import Blank from '../../Images/404-wide.png';
import Error from '../../Images/error.svg';
import { Link } from 'react-router-dom';
import { SRLWrapper } from "simple-react-lightbox";

function TVEpisode(props) {
    const [Detail, setDetail] = useState();
    const [Images, setImages] = useState();
    useEffect(() => {
        if (props.match.params.id) {
            fetch(`${API_URL}tv/${props.match.params.id}/season/${props.match.params.seasonNumber}/episode/${props.match.params.episodeNumber}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setDetail(res);
                    document.title = `MovieBox - ${props.match.params.title}`;
                })
            fetch(`${API_URL}tv/${props.match.params.id}/season/${props.match.params.seasonNumber}/episode/${props.match.params.episodeNumber}/images?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setImages(res)
                })
        }
    }, []);
    return (
        <div>
            {Detail ?
                <div className="heading-container" style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.925) 0%, rgba(0,0,0,0.8) 100%),url(${IMAGE_URL}/original${Detail.still_path}`
                }}>
                    <div className="heading-grid">
                        <div>
                            {Detail.still_path !== null ? <img src={`${IMAGE_URL}/w342${Detail.still_path}`} alt="poster" /> : <img src={Blank} alt="poster" />}
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
                                : <div><h2>Overview</h2><p>Not Yet Released.</p></div>}
                            <h4>User Score: <span className="user-score">{Detail.vote_average.toFixed(1)}</span> ({Detail.vote_count} voted)</h4>
                        </div>
                    </div>
                </div> :
                <div className="loading-container"><h1>Loading</h1></div>}
            {Detail && Detail.guest_stars.length > 0 ?
                <div className="tv-episode-container">
                    <h1>Guest Stars</h1>
                    <div className="guest-star-container">
                        {Detail.guest_stars.map((cast, index) => {
                            return <Link to={`/person/${cast.id}`} key={index}>
                                {cast.profile_path !== null ? <img src={`${IMAGE_URL}/w185${cast.profile_path}`} alt="cast"></img> : <img src={Error} className="error" alt="cast"></img>}
                                <h4>{cast.character}</h4>
                                <p>{cast.name}</p>
                            </Link>
                        })}
                    </div>
                </div>
                : <span></span>}
            {Detail && Images ?
                <div className="tv-episode-image-container">

                    <div className="tv-images-grid">
                        {Images.stills.map((images, index) => {
                            return <SRLWrapper key={index}>
                                <img src={`${IMAGE_URL}/original${images.file_path}`} alt={`Image ${index + 1}`} ></img>
                            </SRLWrapper>
                        })}
                    </div>
                </div>
                : <span></span>}
        </div>
    )
}

export default TVEpisode
