import React from 'react';
import FormLogInGuest from '../components/FormLogInGuest';
import Page from '../components/Page';
import '../styles/index.css';

const LogInGuestPage = (props) => (
    <Page setPageToLogin={props.setPageToLogin}>
        <FormLogInGuest
            setToken={props.setToken}
            setUsername={props.setUsername} />
        {props.children}
    </Page>
);

export default LogInGuestPage;