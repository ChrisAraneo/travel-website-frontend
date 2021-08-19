import React, { SyntheticEvent } from "react";
import { Author } from "../../model/Author";
import { Travel } from "../../model/Travel";

interface Props {
  travel: Travel;
  goToTravelPage: (travelId: string) => any;
}

const TravelListItem: React.FC<Props> = (props) => {
  const { id_travel, title, location, authors } = props.travel;

  const names = authors.map(
    (author: Author) => `${author.firstname} ${author.lastname}`
  );

  const onClick = (event: SyntheticEvent) => {
    event.preventDefault();
    props.goToTravelPage(id_travel);
  };

  return (
    <div className="box travel-list-item">
      <a onClick={onClick}>
        <p>{location}</p>
        <h1 className="title is-spaced">{title}</h1>
        <h3 className="subtitle">{names.join(", ")}</h3>
      </a>
    </div>
  );
};

export default TravelListItem;
