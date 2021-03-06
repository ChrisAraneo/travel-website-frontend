import React from 'react';
import '../styles/index.css';

const SiteFooter = (props) => {
    const { username } = props.bundle;
    return (
        <footer
            className="box has-background-dark"
            style={{ maxWidth: '100%', marginLeft: 'auto', margtinRight: 'auto' }}>
            {
                username ?
                    <h2>Zalogowano jako <strong>{username}</strong></h2>
                    :
                    null
            }

            {
                props.setPageToLogin ?
                    <h2><a onClick={event => { event.preventDefault(); props.setPageToLogin(); }}>Zaloguj się do panelu administratora</a></h2>
                    :
                    null
            }
            <a href="https://www.freepik.com/free-photos-vectors/abstract">Abstract vector created by freepik - www.freepik.com</a>
            <a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by rawpixel.com - www.freepik.com</a>
        </footer>
    );
}

export default SiteFooter;