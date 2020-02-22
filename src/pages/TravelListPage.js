import React from 'react';
import '../styles/index.css';

import TravelListItem from '../components/TravelListItem';
import TravelListYearSeparator from '../components/TravelListYearSeparator';

class TravelListPage extends React.Component {

    render() {
        const { bundle, goToTravelPage } = this.props;
        const { fulltravels } = bundle;

        if (fulltravels) {
            return (
                <div className="box has-background-dark" >
                    {
                        fulltravels.map((item, i) => {
                            if (i === 0) {
                                return (
                                    <>
                                        <TravelListYearSeparator>{item.date.getFullYear()}</TravelListYearSeparator>
                                        <TravelListItem
                                            key={item.id_travel}
                                            travel={item}
                                            goToTravelPage={goToTravelPage}
                                        />
                                    </>
                                );
                            } else if (i > 0) {
                                const A = fulltravels[i - 1];
                                const B = item;
                                const YA = A.date.getFullYear();
                                const YB = B.date.getFullYear();
                                if (YA > YB) {
                                    return (
                                        <>
                                            <TravelListYearSeparator>{YB}</TravelListYearSeparator>
                                            <TravelListItem
                                                key={item.id_travel}
                                                travel={item}
                                                goToTravelPage={goToTravelPage}
                                            />
                                        </>
                                    );
                                }
                            }
                            return (
                                <TravelListItem
                                    key={item.id_travel}
                                    travel={item}
                                    goToTravelPage={goToTravelPage}
                                />
                            );
                        })
                    }
                </div>
            );
        }

        return null;
    }
}

export default TravelListPage;