import React from "react";

interface Props {
  setPageToGlobe?: () => any;
  setPageToTravelList?: () => any;
}

const Navigation: React.FC<Props> = (props: Props) => {
  const isNavigationVisible = !!(
    props.setPageToGlobe || props.setPageToTravelList
  );
  return (
    <>
      {isNavigationVisible && (
        <nav id="navigation" data-testid="navigation">
          <ul className="columns">
            <li className="column">
              <a
                data-testid="globe-button"
                className={`button is-rounded is-primary is-fullwidth ${
                  props.setPageToGlobe ? "" : "is-active"
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  if (props.setPageToGlobe) {
                    props.setPageToGlobe();
                  }
                }}
              >
                Globus
              </a>
            </li>
            <li className="column">
              <a
                data-testid="travel-list-button"
                className={`button is-rounded is-primary is-fullwidth ${
                  props.setPageToTravelList ? "" : "is-active"
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  if (props.setPageToTravelList) {
                    props.setPageToTravelList();
                  }
                }}
              >
                Prelekcje
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
