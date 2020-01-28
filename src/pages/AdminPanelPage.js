import React from 'react';
import FormCreateUser from '../components/FormCreateUser';
import FormCreateAuthor from '../components/FormCreateAuthor';
import FormCreateMeetingPoint from '../components/FormCreateMeetingPoint';
import FormCreateTravel from '../components/FormCreateTravel';
import Page from '../components/Page';
import Title from '../components/Title';
import '../styles/index.css';

const AdminPanelPage = (props) => {
    if (props.username === "admin") {
        return (
            <Page
                setPageToGlobe={props.setPageToGlobe}
                setPageToTravelList={props.setPageToTravelList}>
                <header className="box" style={{ maxWidth: '100%', marginLeft: 'auto', margtinRight: 'auto' }}>
                    <Title>{`Zalogowano jako ${props.username}`}</Title>
                </header>
                <FormCreateUser token={props.token} />
                <FormCreateAuthor token={props.token} />
                <FormCreateMeetingPoint token={props.token} />
                <FormCreateTravel
                    token={props.token}
                    meetingpoints={props.meetingpoints}
                    authors={props.authors} />
                {props.children}
            </Page>
        );
    } else {
        return (
            <Page
                setPageToLogin={props.setPageToLogin}
                setPageToGlobe={props.setPageToGlobe}
                setPageToTravelList={props.setPageToTravelList}>
                <div className="box">
                    <h1 className="title">Niestety nie jesteś zalogowany jako admin</h1>
                </div>
            </Page>
        );
    }
}

export default AdminPanelPage;