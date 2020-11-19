import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'

function Search(props) {
    console.log(props)

    const [Page, setPage] = useState(1);

    useEffect(() => {
        fetch(`${API_URL}search/${props.match.params.type}?api_key=${API_KEY}&language=en-US&query=${props.match.params.query}&page=${Page}&include_adult=false`)
            .then(res => res.json())
            .then(res => {
                console.log(res)

                document.title = `MovieBox - ${props.match.params.query}`;
            })
    }, [Page]);
    return (
        <div>

        </div>
    )
}

export default Search
