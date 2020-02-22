import React from 'react';
import '../styles/index.css';

const TravelListYearSeparator = (props) => (
    <h1 className="has-text-light has-text-centered is-size-5 has-text-weight-bold half-margin-bottom" style={{ opacity: 0.8 }}>
        {props.children}
    </h1>
);

export default TravelListYearSeparator;