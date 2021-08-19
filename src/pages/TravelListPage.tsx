import React from "react";
import TravelListItem from "../components/TravelListItem/TravelListItem";
import TravelListYearSeparator from "../components/TravelListYearSeparator/TravelListYearSeparator";
import { Travel } from "../model/Travel";

interface Props {
  goToTravelPage: (travelId: string) => any;
  travels: Travel[];
}

const TravelListPage: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props?.travels ? null : (
        <div className="box has-background-dark">
          {props.travels.map((travel, i) => {
            if (i === 0) {
              return (
                <>
                  <TravelListYearSeparator>
                    {travel.date.getFullYear()}
                  </TravelListYearSeparator>
                  <TravelListItem
                    key={travel.id_travel}
                    travel={travel}
                    goToTravelPage={props.goToTravelPage}
                  />
                </>
              );
            } else if (i > 0) {
              const lastTravel = props.travels[i - 1];
              const lastTravelYear = lastTravel?.date?.getFullYear();
              const travelYear = travel?.date?.getFullYear();
              if (lastTravelYear > travelYear) {
                return (
                  <>
                    <TravelListYearSeparator>
                      {travelYear}
                    </TravelListYearSeparator>
                    <TravelListItem
                      key={travel.id_travel}
                      travel={travel}
                      goToTravelPage={props.goToTravelPage}
                    />
                  </>
                );
              }
            }
            return (
              <TravelListItem
                key={travel.id_travel}
                travel={travel}
                goToTravelPage={props.goToTravelPage}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default TravelListPage;
