import React from 'react';
import '../styles/index.css';

const TravelListItem = (props) => {

    const { title, location, authors } = props.travel;

    const names = [];
    authors.forEach(author => names.push(`${author.firstname} ${author.lastname}`));

    return (
        <div>
            <h2>{location}</h2>
            <h1>{title}</h1>
            <h3>{names.join(", ")}</h3>
        </div>
    );
}

export default TravelListItem;