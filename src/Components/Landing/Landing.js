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
    const [People, setPeople] = useState(false);
    const [Placeholder, setPlaceholder] = useState("Searching Movies..");
    useEffect(() => {
        fetch(`${API_URL}movie/popular?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                setHero(res.results)
                document.title = `MovieBox - The Ultimate Film Database`;
            })

    }, [])


    const onChangeSearch = (e) => {
        setQuery(e.currentTarget.value)

    }

    const handleSubmit = () => {
        if (TV) {
            props.history.push(`/search/tv/${Query}`);
        }
        else if (People) {
            props.history.push(`/search/person/${Query}`);
        }
        else if (Movie) {
            props.history.push(`/search/movie/${Query}`);
        }
    }

    const onChangeSearchInput = (e) => {
        //console.log(e.target.name)
        if (e.target.name === 'TV') {
            setTV(true)
            setMovie(false)
            setPeople(false)
            setPlaceholder("Searching For Television Shows...")
        }
        else if (e.target.name === 'Movie') {
            setTV(false)
            setMovie(true)
            setPeople(false)
            setPlaceholder("Searching For Movies...")
        }
        else if (e.target.name === 'People') {
            setTV(false)
            setMovie(false)
            setPeople(true)
            setPlaceholder("Searching For People...")
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
                            <h2>Millions of Movies, TV Shows and People. By the Fans.</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    value={Query}
                                    type="input"
                                    required
                                    onChange={onChangeSearch}
                                    placeholder={Placeholder}
                                ></input>
                                <button>Search</button>
                            </form>
                            <div className="button-group">
                                <div>
                                    {Movie ? <button value={Movie} name="Movie" style={{ backgroundColor: "#05cfd3" }} >Movie</button> : <button value={Movie} name="Movie" onClick={onChangeSearchInput}>Movie</button>}
                                </div>
                                <div>
                                    {TV ? <button value={TV} name="TV" style={{ backgroundColor: "#05cfd3" }}>TV</button> : <button value={TV} name="TV" onClick={onChangeSearchInput}>TV</button>}
                                </div>
                                <div>
                                    {People ? <button value={People} name="People" style={{ backgroundColor: "#05cfd3" }}>People</button> : <button value={People} name="People" onClick={onChangeSearchInput}>People</button>}
                                </div>
                            </div>
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
