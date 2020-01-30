import React from 'react';
import '../styles/index.css';

// import Title from './Title';



const TravelListItem = (props) => {

    const { title, location, authors } = props.travel;

    const names = [];
    authors.forEach(author => names.push(`${author.firstname} ${author.lastname}`));

    return (
        <div className="box travel-list-item">
            <a>
                <p>{location}</p>
                <h1 className="title is-spaced">{title}</h1>
                <h3 className="subtitle">{names.join(", ")}</h3>
            </a>
        </div>
    );
}

export default TravelListItem;