import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Link } from 'react-router-dom';
import Blank from '../../Images/404.png'
import Pattern from '../../Images/dark-geometric.png'

function Person(props) {

    const [Detail, setDetail] = useState();
    const [Credits, setCredits] = useState();
    const [Directed, setDirected] = useState();
    const [Star, setStarred] = useState();

    useEffect(() => {
        if (props.match.params.id) {
            fetch(`${API_URL}person/${props.match.params.id}?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    setDetail(res)
                    document.title = `MovieBox - ${res.name}`;
                })


            fetch(`${API_URL}person/${props.match.params.id}/combined_credits?api_key=${API_KEY}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setCredits(res);
                    //Both starred and directed movies
                    if (res.cast.length > 0 && res.crew.length > 0) {
                        res.crew.forEach(index => {
                            if (index.job === "Director") {
                                setDirected(true)
                            }
                        })
                        setStarred(true)
                    }
                    //If only starred in movies
                    if (res.cast.length > 0 && res.crew.length === 0) {
                        setStarred(true)
                        setDirected(false)
                    }
                    //If only directed movies
                    if (res.cast.length === 0 && res.crew.length > 0) {
                        res.crew.map(index => {
                            if (index.job === "Director") {
                                setStarred(false)
                                setDirected(true)
                            }
                        })
                    }
                })
        }
    }, []);
    return (
        <div>
            {Detail ?
                <div className="person-container" style={{
                    backgroundImage: `radial-gradient(circle, rgba(71,80,201,0.45) 0%, rgba(167,17,116,0.4) 100%),url(${Pattern}`
                }}>
                    <div className="person-grid">
                        <div>
                            {Detail.profile_path !== null ? <img src={`${IMAGE_URL}/w342${Detail.profile_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                        </div>
                        <div>
                            <h1>{Detail.name}</h1>
                            <h4>Biography</h4>
                            <p>{Detail.biography}</p>

                            <div className="person-facts">
                                <div>
                                    <h4>Known For</h4>
                                    <p>{Detail.known_for_department}</p>
                                    <h4>Popularity</h4>
                                    <p> <span className="user-score">{Detail.popularity.toFixed(1)}</span></p>
                                </div>
                                <div>
                                    <h4>Birthday</h4>
                                    <p>{Detail.birthday}</p>
                                    <h4>Place of Birth</h4>
                                    <p>{Detail.place_of_birth}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> :
                <div className="loading-container">Loading</div>}
            {Star && !Directed ?
                <div className="star-container">
                    <h1>Starred</h1>
                    <div className="star-credit-container">
                        {Credits.cast.map((credits, index) => {
                            if (credits.media_type === "tv") {
                                return <a href={`/tv/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.name}</h4>
                                    <p>{credits.first_air_date}</p>
                                </a>
                            }
                            else if (credits.media_type === "movie") {
                                return <a href={`/movie/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.title}</h4>
                                    <p>{credits.release_date}</p>
                                </a>
                            }
                        })}
                    </div>
                </div>
                : <span></span>}
            {!Star && Directed ?
                <div className="star-container">
                    <h1>Directed</h1>
                    <div className="star-credit-container">
                        {Credits.crew.map((credits, index) => {
                            if (credits.media_type === "tv") {
                                return <a href={`/tv/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.name}</h4>
                                    <p>{credits.first_air_date}</p>
                                </a>
                            }
                            else if (credits.media_type === "movie") {
                                return <a href={`/movie/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.title}</h4>
                                    <p>{credits.release_date}</p>
                                </a>
                            }
                        })}
                    </div>
                </div>
                : <span></span>}
            {Star && Directed ?
                <div className="star-container">
                    <h1>Starred</h1>
                    <div className="star-credit-container">
                        {Credits.cast.map((credits, index) => {
                            if (credits.media_type === "tv") {
                                return <a href={`/tv/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.name}</h4>
                                    <p>{credits.first_air_date}</p>
                                </a>
                            }
                            else if (credits.media_type === "movie") {
                                return <a href={`/movie/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.title}</h4>
                                    <p>{credits.release_date}</p>
                                </a>
                            }
                        })}
                    </div>
                    <h1>Directed</h1>
                    <div className="star-credit-container">
                        {Credits.crew.map((credits, index) => {
                            if (credits.media_type === "tv") {
                                return <a href={`/tv/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.name}</h4>
                                    <p>{credits.first_air_date}</p>
                                </a>
                            }
                            else if (credits.media_type === "movie") {
                                return <a href={`/movie/${credits.id}`} key={index}>
                                    {credits.poster_path !== null ? <img src={`${IMAGE_URL}/w342${credits.poster_path}`} alt="poster" /> : <img src={Blank} alt="profile" />}
                                    <h4>{credits.title}</h4>
                                    <p>{credits.release_date}</p>
                                </a>
                            }
                        })}
                    </div>
                </div>
                : <span></span>}
        </div>
    )
}

export default Person
