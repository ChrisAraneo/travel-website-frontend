
import React from 'react';
import '../styles/index.css';

class GlobePage extends React.Component {

    constructor(props) {
        super(props);
        this.addMarkers = this.addMarkers.bind(this);
    }

    state = {
        loaded: false
    }

    initialize() {
        const iframe = document.getElementById("globe-iframe");
        if (iframe) {
            iframe.contentWindow.clickFunction = (id) => {
                this.props.goToTravelPage(id);
            }
        }
    }

    addMarkers() {
        const { fulltravels } = this.props.bundle;
        const iframe = document.getElementById("globe-iframe");
        if (iframe) {
            const addMarker = iframe.contentWindow.addMarker;
            fulltravels.forEach(travel => {
                addMarker(Number(travel.latitude), Number(travel.longitude), travel.location, "author", Number(travel.id_travel));
            });
        }
    }

    render() {
        const { fulltravels } = this.props.bundle;
        return (
            <div id="globe-container" className="box">
                {
                    this.state.loaded && fulltravels.length > 0 ?
                        null
                        :
                        <h1 className="title">Ładowanie...</h1>
                }
                <iframe
                    id="globe-iframe"
                    src={process.env.PUBLIC_URL + '/globe.html'}
                    onLoad={() => this.setState({ loaded: true }, () => {
                        this.initialize();
                        this.addMarkers();
                    })}
                    style={{}}
                />
            </div>
        );
    }

}

export default GlobePage;