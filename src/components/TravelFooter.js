import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const TravelFooter = (props) => (
    <nav>
        <ul style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
            {
                props.goToPrevTravel ?
                    <li className="margin-right">
                        <a href="#" onClick={props.goToPrevTravel}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                            <span className="half-margin-left">Poprzednia</span>
                        </a>
                    </li>
                    :
                    <li className="margin-right has-text-light">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span className="half-margin-left">Brak poprzedniej</span>
                    </li>
            }
            {
                props.goToNextTravel ?
                    <li>
                        <a href="#" onClick={props.goToNextTravel}>
                            <span className="half-margin-right">Następna</span>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </li>
                    :
                    <li className="has-text-light">
                        <span className="half-margin-right">Brak następnej</span>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </li>
            }
        </ul>
    </nav>
)

export default TravelFooter;