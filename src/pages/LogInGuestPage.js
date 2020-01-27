import React from 'react';
import FormLogInGuest from '../components/FormLogInGuest';
import Page from '../components/Page';
import '../styles/index.css';

const LogInGuestPage = (props) => (
    <Page>
        <FormLogInGuest setToken={token => props.setToken(token)} />
    </Page>
);

export default LogInGuestPage;