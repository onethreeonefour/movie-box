import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import { Link } from 'react-router-dom'

function Advert() {
    /*set background image - in this case we're just gonna make it star wars
        Get most popular movies to showcase
            -Star Wars || id:11
            -Shawshank Redemption || id:278
            -Godfather || id:238
            -Lord of the Rings ||  id:122
            -Pulp Fiction || id:680
            -Terminator 1 || id:218
    */
    const [starWars, setstarWars] = useState();
    const [shawShank, setshawShank] = useState();
    const [godFather, setgodFather] = useState();
    const [lotr, setlotr] = useState();
    const [pulpFiction, setpulpFiction] = useState();
    const [terminator, setterminator] = useState();
    useEffect(() => {
        //Classic Movie Cards 
        fetch(`${API_URL}movie/11?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                setstarWars(res);
            })

        fetch(`${API_URL}movie/278?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setshawShank(res);
            })
        fetch(`${API_URL}movie/238?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setgodFather(res);
            })
        fetch(`${API_URL}movie/122?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setlotr(res);
            })
        fetch(`${API_URL}movie/680?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setpulpFiction(res);
            })
        fetch(`${API_URL}movie/218?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setterminator(res);
            })
    }, []);
    return (
        <>
            {starWars && shawShank && godFather && lotr && pulpFiction && terminator ? <div className="advert-container" style={{
                backgroundImage: `linear-gradient(0deg, rgba(28,2,48,0.8) 0%, rgba(7,0,13,0.85) 100%),url(${IMAGE_URL}/original${starWars.backdrop_path})`
            }}>
                <div className="advert-grid">
                    <div>
                        <h1>Join Today</h1>
                        <p>Get access to maintain your own custom personal lists, track what you've seen and search and filter for what to watch next—regardless if it's in theatres, on TV or available on popular streaming services like DOCSVILLE, BINGE, Beamafilm, and HiDive.</p>
                    </div>
                    <div>
                        <ul>
                            <li>Enjoy TMDb ad free</li>
                            <li>Maintain a personal watchlist</li>
                            <li>Filter by your subscribed streaming services and find something to watch</li>
                            <li>Log the movies and TV shows you've seen</li>
                            <li>Build custom lists</li>
                            <li>Contribute to and improve our database</li>
                        </ul>
                    </div>
                </div>
                <h2>Find Similar Movies From Certified Classics</h2>
                <div className="advert-classics">
                    <Link to={`/movie/11`}>
                        <img src={`${IMAGE_URL}/w185${starWars.poster_path}`} alt="hero"></img>
                    </Link>
                    <Link to={`/movie/278`}>
                        <img src={`${IMAGE_URL}/w185${godFather.poster_path}`} alt="hero"></img>
                    </Link>
                    <Link to={`/movie/238`}>
                        <img src={`${IMAGE_URL}/w185${shawShank.poster_path}`} alt="hero"></img>
                    </Link>
                    <Link to={`/movie/680`}>
                        <img src={`${IMAGE_URL}/w185${pulpFiction.poster_path}`} alt="hero"></img>
                    </Link>
                    <Link to={`/movie/122`}>
                        <img src={`${IMAGE_URL}/w185${lotr.poster_path}`} alt="hero"></img>
                    </Link>
                    <Link to={`/movie/218`}>
                        <img src={`${IMAGE_URL}/w185${terminator.poster_path}`} alt="hero"></img>
                    </Link>
                </div>
                <a href="https://www.themoviedb.org/signup" className="join-today-button">Join Today</a>
            </div >
                : <div>Loading</div>}
        </>
    )
}

export default Advert
