import React from "react";
import TravelListItem from "../components/TravelListItem/TravelListItem";
import TravelListYearSeparator from "../components/TravelListYearSeparator/TravelListYearSeparator";
import { Travel } from "../model/Travel_";

interface Props {
  goToTravelPage: (travelId: string) => any;
  travels: Travel[];
}

const TravelListPage: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props?.travels ? (
        <div className="box has-background-dark">
          {props.travels.map((travel: Travel, i: number) => {
            if (i === 0) {
              return (
                <div key={travel?.id_travel} className="padding-bottom">
                  <TravelListYearSeparator>
                    {travel.date.getFullYear()}
                  </TravelListYearSeparator>
                  <TravelListItem
                    travel={travel}
                    goToTravelPage={props.goToTravelPage}
                  />
                </div>
              );
            } else if (i > 0) {
              const lastTravel = props.travels[i - 1];
              const lastTravelYear = lastTravel?.date?.getFullYear();
              const travelYear = travel?.date?.getFullYear();
              if (lastTravelYear > travelYear) {
                return (
                  <div key={travel?.id_travel} className="padding-bottom">
                    <TravelListYearSeparator>
                      {travelYear}
                    </TravelListYearSeparator>
                    <TravelListItem
                      travel={travel}
                      goToTravelPage={props.goToTravelPage}
                    />
                  </div>
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
      ) : null}
    </>
  );
};

export default TravelListPage;
