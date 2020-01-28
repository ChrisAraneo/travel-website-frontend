import React from 'react';
import '../styles/index.css';

const Navigation = (props) => {
    if (props.setPageToGlobe || props.setPageToTravelList) {
        return (
            <nav id="navigation">
                <ul className="columns">
                    <li className="column">
                        <a className={`button is-rounded is-primary is-fullwidth ${props.setPageToGlobe !== undefined ? '' : 'is-active'}`}
                            onClick={event => { event.preventDefault(); if (props.setPageToGlobe) { props.setPageToGlobe(); } }}>
                            Globus
                    </a>
                    </li>
                    <li className="column">
                        <a className={`button is-rounded is-primary is-fullwidth ${props.setPageToTravelList !== undefined ? '' : 'is-active'}`}
                            onClick={event => { event.preventDefault(); if (props.setPageToTravelList) { props.setPageToTravelList(); } }}>
                            Prelekcje
                    </a>
                    </li>
                </ul>
            </nav>
        );
    }
    return null;
}

export default Navigation;