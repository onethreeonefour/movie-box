import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 40
    }
};

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

        fetch(`${API_URL}tv/popular/?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => {
                setTV({ data: res.results, active: true });
            })

        fetch(`${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`)
            .then(res => res.json())
            .then(res => {
                setMovie({ data: res.results, active: false });
            })


        fetch(`${API_URL}person/popular/?api_key=${API_KEY}&language=en-US&page=1`)
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
                {TV.active ? <button style={{ backgroundColor: "#364f6b", color: "white" }}>TV</button> : <button onClick={activateTV}>TV</button>}
                {Movie.active ? <button style={{ backgroundColor: "#364f6b", color: "white" }}>Movie</button> : <button onClick={activateMovie}>Movie</button>}
                {People.active ? <button style={{ backgroundColor: "#364f6b", color: "white" }}>People</button> : <button onClick={activatePeople}>People</button>}
            </div>
            <Carousel
                responsive={responsive}

                className="carousel"
                partialVisible={true}
            >
                {TV.active ? TV.data.map((data, index) => {
                    return <React.Fragment key={index}>
                        <Link to={`/tv/${data.id}`}>
                            <img src={`${IMAGE_URL}/w185${data.poster_path}`} alt="hero"></img>
                            <p>{data.name} <span className="vote-average">{data.vote_average.toFixed(1)}</span></p>
                        </Link>
                    </React.Fragment>
                })
                    : Movie.active ? Movie.data.map((data, index) => {

                        return <React.Fragment key={index}>
                            <Link to={`/movie/${data.id}`}>
                                <img src={`${IMAGE_URL}/w185${data.poster_path}`} alt="hero"></img>
                                <p>{data.title} <span className="vote-average">{data.vote_average.toFixed(1)}</span></p>
                            </Link>
                        </React.Fragment>
                    })
                        : People ? People.data.map((data, index) => {
                            return <React.Fragment key={index}>
                                <Link to={`/person/${data.id}`}>
                                    <img src={`${IMAGE_URL}/w185${data.profile_path}`} alt="hero"></img>
                                    <p>{data.name} <span className="vote-average">{data.popularity.toFixed(1)}</span></p>
                                </Link>
                            </React.Fragment>
                        })
                            : <h1>Hi</h1>}
            </Carousel>
        </div>
    )
}

export default TrendingMovies