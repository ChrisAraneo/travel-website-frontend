import React from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Navigation from './Navigation';
import Message from './Message';
import '../styles/index.css';

class Page extends React.Component {

    state = {
        messageVisible: true
    }

    render() {
        return (
            <main id="page-wrapper">
                <div id="page-container" className="box">
                    <div className="page">
                        <SiteHeader />
                        <Navigation
                            setPageToGlobe={this.props.setPageToGlobe}
                            setPageToTravelList={this.props.setPageToTravelList} />
                        <Message
                            header={this.props.success ? 'OK' : 'Błąd'}
                            type={this.props.success ? 'success' : 'danger'}
                            visible={!this.props.success && this.state.messageVisible}
                            onClick={() => { this.setState({ messageVisible: false }) }}>
                            {this.props.message}
                        </Message>
                        {this.props.children}
                        <SiteFooter setPageToLogin={this.props.setPageToLogin} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Page;