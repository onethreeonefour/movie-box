import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'

function TrendingMovies() {
    const [People, setPeople] = useState({
        data: [],
        active: false
    });

    const [TV, setTV] = useState({
        data: [],
        active: true
    });
    const [Movie, setMovie] = useState({
        data: [],
        active: false
    });

    useEffect(() => {

        fetch(`${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => {
                setTV({ data: res.results, active: true });

            })

        fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => {
                setMovie({ data: res.results, active: false });
            })



        fetch(`${API_URL}person/popular?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => {
                setPeople({ data: res.results, active: false });
            })

    }, []);


    const activateTV = () => {
        setTV({ data: [...TV.data], active: true })
        setMovie({ data: [...Movie.data], active: false })
        setPeople({ data: [...People.data], active: false })
    }
    const activateMovie = () => {
        setTV({ data: [...TV.data], active: false })
        setMovie({ data: [...Movie.data], active: true })
        setPeople({ data: [...People.data], active: false })

    }

    const activatePeople = () => {
        setTV({ data: [...TV.data], active: false })
        setMovie({ data: [...Movie.data], active: false })
        setPeople({ data: [...People.data], active: true })

    }



    return (
        <div className="trending-container">
            <h1>What's Popular</h1>
            <div className="trending-button">
                {TV.active ? <button style={{ backgroundColor: "#03c4a1", color: "white" }}>TV</button> : <button onClick={activateTV}>TV</button>}
                {Movie.active ? <button style={{ backgroundColor: "#03c4a1", color: "white" }}>Movies</button> : <button onClick={activateMovie}>Movies</button>}
                {People.active ? <button style={{ backgroundColor: "#03c4a1", color: "white" }}>People</button> : <button onClick={activatePeople}>People</button>}
            </div>
            <div className="trending-card-container">
                {TV.active ? TV.data.map((data, index) => {
                    return <React.Fragment key={index}>
                        <a href={`/tv/${data.id}`}>
                            <div>
                                <span className="vote-average">{data.vote_average.toFixed(1)}</span>
                                <img src={`${IMAGE_URL}/w185${data.poster_path}`} alt="hero"></img>
                                <p>{data.name} </p>
                            </div>

                        </a>
                    </React.Fragment>
                })
                    : Movie.active ? Movie.data.map((data, index) => {

                        return <React.Fragment key={index}>
                            <a href={`/movie/${data.id}`}>
                                <div>
                                    <span className="vote-average">{data.vote_average.toFixed(1)}</span>
                                    <img src={`${IMAGE_URL}/w185${data.poster_path}`} alt="hero"></img>
                                    <p>{data.title} </p>
                                </div>

                            </a>
                        </React.Fragment>
                    })
                        : People ? People.data.map((data, index) => {
                            return <React.Fragment key={index}>
                                <a href={`/person/${data.id}`}>
                                    <span className="vote-average">{`${Math.round(data.popularity)}%`}</span>
                                    <img src={`${IMAGE_URL}/w185${data.profile_path}`} alt="hero"></img>
                                    <p>{data.name}</p>
                                </a>
                            </React.Fragment>
                        })
                            : <h1>Loading</h1>}
            </div>

        </div>
    )
}

export default TrendingMovies
