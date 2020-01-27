import React from 'react';
import FormLogIn from '../components/FormLogIn';
import Page from '../components/Page';
import '../styles/index.css';

const LogInPage = (props) => (
    <Page>
        <FormLogIn setToken={token => props.setToken(token)} />
    </Page>
);

export default LogInPage; 