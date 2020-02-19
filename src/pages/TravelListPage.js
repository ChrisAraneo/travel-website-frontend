import React from 'react';
import '../styles/index.css';

import TravelListItem from '../components/TravelListItem';

class TravelListPage extends React.Component {

    render() {
        const { fulltravels } = this.props.bundle;

        if (fulltravels) {
            return (
                <div className="box has-background-dark" >
                    {
                        fulltravels.map(item => (
                            <TravelListItem key={item.id_travel} travel={item} />
                        ))
                    }
                </div>
            );
        }

        return null;
    }
}

export default TravelListPage;