import React from 'react';
import FormLogInGuest from '../components/FormLogInGuest';
import Page from '../components/Page';
import '../styles/index.css';

const LogInGuestPage = (props) => (
    <FormLogInGuest
        setToken={props.setToken}
        setUsername={props.setUsername} />
);

export default LogInGuestPage;