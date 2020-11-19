import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Trending from './Trending'
import Advert from './Advert'

const randomNum = Math.floor(Math.random() * 18);

function Landing(props) {
    const [Hero, setHero] = useState();
    const [Query, setQuery] = useState("");
    const [Movie, setMovie] = useState(true)
    const [TV, setTV] = useState(false);
    useEffect(() => {
        fetch(`${API_URL}movie/popular?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                setHero(res.results)
                document.title = `MovieBox - The Ulimate Film Database`;
            })

    }, [])


    const onChangeSearch = (e) => {
        setQuery(e.currentTarget.value)

    }

    const handleSubmit = () => {
        props.history.push(`/search/${Query}`);
    }

    const onChangeSearchInput = (e) => {
        if (e.target.name === 'tv') {

            setTV(true)
            setMovie(false)
        }
        else {
            setTV(false)
            setMovie(true)
        }
    }

    return (
        <>
            {Hero ?
                <div className="hero-container" style={{
                    backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%),url(${IMAGE_URL}/original${Hero[randomNum].backdrop_path}`
                }}>
                    <div className="hero-grid" >
                        <div>
                            <h1>Welcome To The MovieBox</h1>
                            <h2>Millions of Movies, TV Shows - Curated by the fans.</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    value={Query}
                                    type="input"
                                    required
                                    onChange={onChangeSearch}
                                ></input>
                                <button>Search</button>
                                <div className="radio-group" onChange={onChangeSearchInput}>
                                    <div>
                                        <input type="radio" name="movie" value={Movie} checked={Movie}></input>
                                        <label htmlFor="movie">Movie</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="tv" value={TV} checked={TV}></input>
                                        <label htmlFor="tv">TV</label>
                                    </div>

                                </div>
                            </form>
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
