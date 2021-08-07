import React from "react";
import "../styles/index.css";
import Message from "./Message/Message";
import Navigation from "./Navigation";
import SiteFooter from "./SiteFooter/SiteFooter";
import SiteHeader from "./SiteHeader";

class Page extends React.Component {
  state = {
    messageVisible: true,
  };

  render() {
    const { success, message } = this.props.bundle;
    return (
      <main id="page-wrapper">
        <div id="page-container" className="box">
          <div className="page">
            <SiteHeader />
            <Navigation
              setPageToGlobe={this.props.setPageToGlobe}
              setPageToTravelList={this.props.setPageToTravelList}
            />
            <Message
              header={success ? "OK" : "Błąd"}
              type={success ? "success" : "danger"}
              visible={!success && this.state.messageVisible}
              onClick={() => {
                this.setState({ messageVisible: false });
              }}
            >
              {message}
            </Message>
            {this.props.children}
            <SiteFooter
              username={this.props.bundle.username}
              setPageToLogin={this.props.setPageToLogin}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Page;
