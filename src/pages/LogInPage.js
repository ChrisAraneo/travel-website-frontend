import React from 'react';
import FormLogIn from '../components/FormLogIn';
import Page from '../components/Page';
import '../styles/index.css';

const LogInPage = (props) => (
    <Page>
        <FormLogIn
            setToken={props.setToken}
            setUsername={props.setUsername} />
        {props.children}
    </Page>
);

export default LogInPage; 