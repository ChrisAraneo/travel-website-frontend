import React from 'react';
import '../styles/index.css';

import Page from '../components/Page';
import Title from '../components/Title';
import TravlListItem from '../components/TravelListItem';
import TravelListItem from '../components/TravelListItem';

class TravelListPage extends React.Component {

    render() {

        const { fulltravels } = this.props.bundle;

        return (
            <Page
                bundle={this.props.bundle}
                setPageToLogin={this.props.setPageToLogin}
                setPageToGlobe={this.props.setPageToGlobe}>
                {
                    fulltravels ?
                        (
                            <div className="box">
                                {
                                    fulltravels.map(item => (<TravelListItem key={item.id_travel} travel={item} />))
                                }
                            </div>
                        )
                        :
                        <div className="box">
                            <Title>Brak prelekcji w bazie danych</Title>
                        </div>
                }
            </Page>
        );
    }
}

export default TravelListPage;