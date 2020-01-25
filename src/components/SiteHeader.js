import React from 'react';
import '../styles/index.css';

import background from '../images/site-header.jpg';
import config from '../config/config';

class SiteHeader extends React.Component {

    componentDidMount() {
        const image = `url(${background})`;
        const siteHeaders = document.getElementsByClassName("site-header");
        for (let i = 0; i < siteHeaders.length; i++) {
            const header = siteHeaders[i];
            if (header.style.background !== image) {
                header.style.backgroundImage = image;
                header.style.backgroundSize = "100% auto";
            }
        }
    }

    render() {
        return (
            <section class="site-header hero box">
                <div class="hero-body">
                    <div class="container">
                        <h3 class="subtitle has-text-centered has-text-grey-light">
                            {config.siteHeaderSubtitleAbove}
                        </h3>
                        <h1 class="title has-text-centered has-text-white">
                            {config.siteHeaderTitle}
                        </h1>
                        <h2 class="subtitle has-text-centered has-text-grey-lighter">
                            {config.siteHeaderSubtitle}
                        </h2>
                    </div>
                </div>
            </section>
        );
    }
}

export default SiteHeader;