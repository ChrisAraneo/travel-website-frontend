import React from 'react';
import '../styles/index.css';

import background from '../images/site-header.jpg';
import body from '../images/site-header-title-background.png';

import config from '../config/config';

class SiteHeader extends React.Component {

    componentDidMount() {
        const image = `url(${background})`;
        const image2 = `url(${body})`;
        const siteHeaders = document.getElementsByClassName("site-header");
        for (let i = 0; i < siteHeaders.length; i++) {
            const header = siteHeaders[i];
            if (header.style.background !== image) {
                header.style.backgroundImage = image;
                header.style.backgroundSize = "100% auto";
            }
            const body = header.firstChild;
            body.style.backgroundImage = image2;
            body.style.backgroundSize = "100% auto";
        }
    }

    render() {
        return (
            <section class="site-header hero box">
                <div class="hero-body" style={{ padding: '1.5rem 3rem' }}>
                    <div class="container">
                        <h3 class="subtitle has-text-centered has-text-grey-light">
                            {config.siteHeaderSubtitleAbove}
                        </h3>
                        <h1 class="title has-text-centered has-text-white" style={{ fontSize: '2.5rem' }}>
                            {config.siteHeaderTitle}
                        </h1>
                        <h2 class="subtitle has-text-centered has-text-grey-lighter" style={{ fontSize: '1.10rem' }}>
                            {config.siteHeaderSubtitle}
                        </h2>
                    </div>
                </div>
            </section>
        );
    }
}

export default SiteHeader;