import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Link } from 'react-router-dom'
import Trending from './Trending'

function Landing() {

    const [Hero, setHero] = useState();

    useEffect(() => {
        fetch(`${API_URL}trending/all/day?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                setHero(res.results)
            })

    }, [])

    return (
        <>
            <div className="hero-container">
                {Hero ?
                    <div className="hero-grid" >
                        <div>
                            <h1>Welcome To The MovieBox</h1>
                            <h2>Millions of Movies, TV Shows - Curated by the fans.</h2>
                            <input></input>
                            <button>Search</button>
                        </div>
                        <div className="hero-grid-images">
                            {Hero.slice(0, 6).map((data, index) => {
                                if (data.media_type === "movie") {
                                    return <Link to={`/movie/${data.id}`} key={index}>
                                        <div className="hero-img-container ">
                                            <img src={`${IMAGE_URL}/w185${data.poster_path}`} alt="hero"></img>
                                            <p>{data.title}</p>
                                        </div>
                                    </Link>
                                }
                                else return <Link to={`/tv/${data.id}`} key={index}>
                                    <div className="hero-img-container ">
                                        <img src={`${IMAGE_URL}/w185${data.poster_path}`} alt="hero"></img>
                                        <p>{data.name}</p>
                                    </div>
                                </Link>
                            })}
                        </div>
                    </div> :
                    <div>Loading</div>}
            </div>
            <div>
                <Trending />
            </div>
        </>
    )
}

export default Landing
