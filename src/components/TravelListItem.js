import React from 'react';
import '../styles/index.css';

const TravelListItem = (props) => {

    const goToTravelPage = props.goToTravelPage;
    const { id_travel, title, location, authors } = props.travel;

    const names = [];
    authors.forEach(author => names.push(`${author.firstname} ${author.lastname}`));

    return (
        <div className="box travel-list-item">
            <a onClick={() => goToTravelPage(id_travel)}>
                <p>{location}</p>
                <h1 className="title is-spaced">{title}</h1>
                <h3 className="subtitle">{names.join(", ")}</h3>
            </a>
        </div>
    );
}

export default TravelListItem;