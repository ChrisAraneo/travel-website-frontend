import React from 'react';
import FormCreateUser from '../components/FormCreateUser';
import FormCreateAuthor from '../components/FormCreateAuthor';
import FormCreateMeetingPoint from '../components/FormCreateMeetingPoint';
import FormCreateTravel from '../components/FormCreateTravel';
import Page from '../components/Page';
import '../styles/index.css';

const AdminPanelPage = (props) => (
    <Page>
        <FormCreateUser token={props.token} />
        <FormCreateAuthor token={props.token} />
        <FormCreateMeetingPoint token={props.token} />
        <FormCreateTravel token={props.token} />
    </Page>
);

export default AdminPanelPage;