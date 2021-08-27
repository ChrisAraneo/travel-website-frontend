import {
  faCalendar,
  faClock,
  faHome,
  faPencilAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import TravelBreadcrumb from "../components/TravelBreadcrumb/TravelBreadcrumb";
import TravelFooter from "../components/TravelFooter/TravelFooter";
import config from "../config/config";
import { Travel } from "../model/Travel";
import { UploadedPhoto } from "../model/UploadedPhoto";

// TODO

interface Props {
  travel?: Travel;
  goToTravelListPage: () => any;
  photos: UploadedPhoto[];
  goToPrevTravel?: () => any;
  goToNextTravel?: () => any;
}

const TravelPage: React.FC<Props> = (props: Props) => {
  const { travel, photos, goToTravelListPage, goToPrevTravel, goToNextTravel } =
    props;

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
      const namesArray: any[] = [];
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
              {travel.meetingpoint?.name}, {travel.meetingpoint?.address}
            </strong>
          </p>
          <br />
          <p className="is-size-5">{travel.description}</p>
        </div>
        <div className="margin-top margin-bottom">
          {photos ? (
            photos.length > 0 ? (
              <ImageGallery
                items={photos.map((photo: UploadedPhoto) => {
                  const item: ReactImageGalleryItem = {
                    original: String(photo.base64),
                    thumbnail: String(photo.base64),
                  };
                  return item;
                })}
              />
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
};

export default TravelPage;
