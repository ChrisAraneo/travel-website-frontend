
import React from 'react';
import Message from '../components/Message';
import '../styles/index.css';

class GlobePage extends React.Component {

    constructor(props) {
        super(props);
        this.addMarkers = this.addMarkers.bind(this);
    }

    state = {
        loaded: false,
        messageVisible: true
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
            <>
                <Message
                    header={'Ładowanie'}
                    type={'info'}
                    visible={!this.state.loaded && this.state.messageVisible}
                    onClick={() => this.setState({ messageVisible: false })}>
                    Trwa ładowanie globusu. Proszę czekać.
                </Message>
                <div id="globe-container" className="box">
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
            </>
        );
    }

}

export default GlobePage;