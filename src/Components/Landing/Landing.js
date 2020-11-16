import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Trending from './Trending'
import Advert from './Advert'

function Landing() {

    const [Hero, setHero] = useState();

    useEffect(() => {
        fetch(`${API_URL}movie/popular?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                setHero(res.results)
            })

    }, [])

    return (
        <>
            {Hero ?
                <div className="hero-container" style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%),url(${IMAGE_URL}/original${Hero[Math.floor(Math.random() * 6)].backdrop_path}`
                }}>

                    <div className="hero-grid" >
                        <div>
                            <h1>Welcome To The MovieBox</h1>
                            <h2>Millions of Movies, TV Shows - Curated by the fans.</h2>
                            <input></input>
                            <button>Search</button>
                        </div>

                    </div>
                </div> :
                <div className="loading-container"><h1>Loading</h1></div>}
            <div>
                <Trending />
            </div>
            <div>
                <Advert />
            </div>
        </>
    )
}

export default Landing
