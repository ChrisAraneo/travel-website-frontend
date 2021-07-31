import {
  faCalendar,
  faClock,
  faHome,
  faPencilAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ImageGallery from "react-image-gallery";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import TravelBreadcrumb from "../components/TravelBreadcrumb";
import TravelFooter from "../components/TravelFooter";
import config from "../config/config";
import "../styles/index.css";

const images2 = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

class TravelPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      travel,
      goToTravelListPage,
      photos,
      goToPrevTravel,
      goToNextTravel,
    } = this.props;
    // const { selectedTravel } = this.state;

    // let prev, next;
    // const travel = fulltravels.find((travel, index) => {
    //     if (travel.id_travel === selectedTravel) {
    //         if (index < fulltravels.length - 1) {
    //             next = fulltravels[index + 1].id_travel;
    //         }
    //         if (index > 0) {
    //             prev = fulltravels[index - 1].id_travel;
    //         }
    //         return travel;
    //     }
    // });

    if (!travel) {
      return (
        <div className="box">
          <TravelBreadcrumb
            goToTravelListPage={goToTravelListPage}
            title="Nie znaleziono"
            goToPrevTravel={goToPrevTravel}
            goToNextTravel={goToNextTravel}
          />
          <Title>Błąd: nie znaleziono odpowiedniej strony podróży</Title>
          <Button onClick={goToTravelListPage}>Wróć do spisu prelekcji</Button>
        </div>
      );
    } else {
      /* NAMES */
      let namesString = "";
      const authors = travel.authors ? travel.authors : [];
      if (authors) {
        const namesArray = [];
        authors.forEach((author) =>
          namesArray.push(`${author.firstname} ${author.lastname}`)
        );
        namesString = namesArray.join(", ");
      }

      return (
        <div className="box">
          <TravelBreadcrumb
            goToTravelListPage={goToTravelListPage}
            title={travel.title}
            goToPrevTravel={goToPrevTravel}
            goToNextTravel={goToNextTravel}
          />

          <Title>{travel.title}</Title>
          <div>
            <p className="is-size-5">
              <strong>{config.siteHeaderTitle}</strong>
            </p>
            <p className="is-size-5">
              <a href={`mailto:${config.email}`}>{config.email}</a>{" "}
              <span className="has-text-light">/</span>{" "}
              <a href="#">{config.urlName}</a>
            </p>
            <p className="is-size-5">Zaprasza na kolejne spotkanie:</p>
            <br />
            <p className="is-size-5">
              <span style={{ display: "inline-block", width: "2.5rem" }}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
              Temat: <strong>{travel.title}</strong>
            </p>
            <p className="is-size-5">
              <span style={{ display: "inline-block", width: "2.5rem" }}>
                <FontAwesomeIcon icon={faUsers} />
              </span>
              {`${
                authors.length > 1 ? "Prelegenci: " : "Prelegent: "
              }${namesString}`}
            </p>
            <p className="is-size-5">
              <span style={{ display: "inline-block", width: "2.5rem" }}>
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              Dzień spotkania:{" "}
              <strong>{travel.date.toLocaleDateString("pl-PL")}</strong>
            </p>
            <p className="is-size-5">
              <span style={{ display: "inline-block", width: "2.5rem" }}>
                <FontAwesomeIcon icon={faClock} />
              </span>
              Godzina: <strong>{String(travel.hour).substring(0, 5)}</strong>
            </p>
            <p className="is-size-5">
              <span style={{ display: "inline-block", width: "2.5rem" }}>
                <FontAwesomeIcon icon={faHome} />
              </span>
              Miejsce spotkania:{" "}
              <strong>
                {travel.meetingpoint.name}, {travel.meetingpoint.address}
              </strong>
            </p>
            <br />
            <p className="is-size-5">{travel.description}</p>
          </div>
          <div className="margin-top margin-bottom">
            {photos ? (
              photos.length > 0 ? (
                <ImageGallery items={this.props.photos} />
              ) : null
            ) : null}
          </div>
          <TravelFooter
            goToPrevTravel={goToPrevTravel}
            goToNextTravel={goToNextTravel}
          />
        </div>
      );
    }
  }
}

export default TravelPage;
