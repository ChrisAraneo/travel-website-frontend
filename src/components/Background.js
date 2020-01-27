import React from 'react';
import '../styles/index.css';
import background from '../images/background.jpg';

class Background extends React.Component {

    componentDidMount() {
        const body = document.getElementById("background");
        body.style.background = `url(${background}) no-repeat center center fixed`;
        body.style.backgroundSize = "cover";
    }

    render() {
        return (<div id="background">
            {this.props.children}
        </div>
        );
    }
}
export default Background;