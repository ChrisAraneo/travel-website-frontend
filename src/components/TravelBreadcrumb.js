import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TravelBreadcrumb = (props) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <nav class="breadcrumb is-medium" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#" onClick={() => props.goToTravelListPage()}>
            Prelekcje
          </a>
        </li>
        <li class="is-active">
          <a href="#" aria-current="page">
            {props.title}
          </a>
        </li>
      </ul>
    </nav>
    <nav>
      <ul style={{ display: "flex", flexDirection: "row" }}>
        {props.goToPrevTravel ? (
          <li className="margin-right">
            <a href="#" onClick={props.goToPrevTravel}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
          </li>
        ) : (
          <li className="margin-right has-text-light">
            <FontAwesomeIcon icon={faChevronLeft} />
          </li>
        )}
        {props.goToNextTravel ? (
          <li>
            <a href="#" onClick={props.goToNextTravel}>
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </li>
        ) : (
          <li className="has-text-light">
            <FontAwesomeIcon icon={faChevronRight} />
          </li>
        )}
      </ul>
    </nav>
  </div>
);

export default TravelBreadcrumb;
