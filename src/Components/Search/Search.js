import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Blank from '../../Images/404.png'

function Search(props) {
    //const [Page, setPage] = useState(1);
    const [Results, setResults] = useState();

    useEffect(() => {
        if (props.match.params.type === 'movie') {
            fetch(`${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${props.match.params.query}&page=1&include_adult=false`)
                .then(res => res.json())
                .then(res => {
                    setResults(res)
                    document.title = `Searching For - ${props.match.params.query}`;
                })
        }
        else if (props.match.params.type === 'tv') {
            fetch(`${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${props.match.params.query}&page=1&include_adult=false`)
                .then(res => res.json())
                .then(res => {
                    setResults(res)
                    document.title = `Searching For - ${props.match.params.query}`;
                })
        }
        else if (props.match.params.type === 'person') {
            fetch(`${API_URL}search/person?api_key=${API_KEY}&language=en-US&query=${props.match.params.query}&page=1&include_adult=false`)
                .then(res => res.json())
                .then(res => {
                    setResults(res)
                    document.title = `Searching For - ${props.match.params.query}`;
                })
        }
    }, [Page]);
    return (
        <div>
            {Results ?
                <div className='search-container'>
                    <h1>Search Results</h1>
                    {Results.results.length > 0 ? Results.results.map((result, index) => {
                        if (props.match.params.type === 'movie') {
                            return <a href={`/movie/${result.id}`} key={index}>
                                <div className="search-card">
                                    <div>
                                        {result.poster_path === null ? <img src={Blank} alt="search" className="search-error"></img> : <img src={`${IMAGE_URL}/w154${result.poster_path}`} alt="search" ></img>}
                                    </div>
                                    <div className="search-card-info">
                                        <h2>{result.title}</h2>
                                        <h4>{result.release_date}</h4>
                                        <h4>Overview</h4>
                                        <p>{result.overview}</p>
                                    </div>
                                </div>
                            </a>
                        }
                        if (props.match.params.type === 'tv') {
                            return <a href={`/tv/${result.id}`} key={index}>
                                <div className="search-card">
                                    <div>
                                        {result.poster_path === null ? <img src={Blank} alt="search" className="search-error"></img> : <img src={`${IMAGE_URL}/w154${result.poster_path}`} alt="search" ></img>}
                                    </div>
                                    <div className="search-card-info">
                                        <h2>{result.name}</h2>
                                        <h4>{result.first_air_date}</h4>
                                        <h4>Overview</h4>
                                        {result.overview.length <= 0 ? <p>It's seem there's no overview. Join now to add to this entry.</p> : <p>{result.overview.slice(0, 500)}.</p>}
                                    </div>
                                </div>
                            </a>
                        }

                        if (props.match.params.type === 'person') {
                            return <a href={`/person/${result.id}`} key={index}>
                                <div className="search-card">
                                    <div>
                                        {result.profile_path === null ? <img src={Blank} alt="search" className="search-error"></img> : <img src={`${IMAGE_URL}/w154${result.profile_path}`} alt="search" ></img>}
                                    </div>
                                    <div className="search-card-info">
                                        <h2>{result.name}</h2>
                                        <h4>Known For {result.known_for_department}</h4>
                                        <h4>Best Known For</h4>
                                        {result.known_for.map((res, index) => {
                                            if (res.media_type === "tv") {
                                                return <span key={index}>{res.name} • </span>
                                            }
                                            if (res.media_type === "movie") {
                                                return <span key={index}>{res.title} • </span>
                                            }
                                            return <span></span>
                                        })}
                                        <h4>Popularity <span className="user-score">{result.popularity.toFixed(1)}</span></h4>
                                    </div>
                                </div>
                            </a>
                        }

                    }) : <div className="loading-container"><h1>No Search Results Found. Please Go Back And Try Again</h1></div>}
                </div>
                : <div className="loading-container"><h1>Loading</h1></div>}
        </div>
    )
}

export default Search
