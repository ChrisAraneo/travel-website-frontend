
import React from 'react';
import '../styles/index.css';

import Page from '../components/Page';

class GlobePage extends React.Component {

    constructor(props) {
        super(props);
        this.appendScript = this.appendScript.bind(this);
    }

    state = {
        ready: false,
    }

    componentDidMount() {
        if (!this.state.ready) {
            this.appendScript();
        }
    }

    appendScript() {
        const id = "webglscript";
        const src = "http://www.webglearth.com/v2/api.js";
        const self = this;
        if (!document.getElementById(id)) {
            const script = document.createElement("script");
            script.id = id;
            script.src = src;
            script.async = true;
            script.crossOrigin = true;
            script.onerror = (error) => {
                alert(error.message);
            }
            script.onload = () => {

                self.setState({ ready: true }, () => {
                    console.log("window.WE", window.WE);
                    console.log("window.WE.map", window.WE.map)
                    if (document.getElementById("earth-div")) {
                        const earth = new window.WE.map("earth-div");
                        console.log("earth", earth);
                        window.WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);
                    } else {
                        console.log("earth-div", document.getElementById("earth-div"))
                    }
                });
            }
            document.body.appendChild(script);
        }
    }

    render() {
        if (this.state.ready) {
            const earth = document.getElementById("earth-div")
            earth.style.height = `${earth.style.width}px`;
        }

        return (
            <Page
                bundle={this.props.bundle}
                setPageToLogin={this.props.setPageToLogin}
                setPageToTravelList={this.props.setPageToTravelList}>
                <div id="earth-div" className="box">
                    {!this.state.ready ?
                        <h1 className="title">Trwa ładowanie globusu...</h1>
                        :
                        null}
                </div>
            </Page>
        );
    }
}

export default GlobePage;