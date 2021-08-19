import React, { useState } from "react";
import Message, { MessageType } from "../Message/Message";
import Navigation from "../Navigation/Navigation";
import SiteFooter from "../SiteFooter/SiteFooter";
import SiteHeader from "../SiteHeader/SiteHeader";

interface Props {
  username: string;
  isSuccess: boolean;
  message: string;
  setPageToGlobe?: () => any;
  setPageToTravelList?: () => any;
  setPageToLogin?: () => any;
  children?: any;
}

const Page: React.FC<Props> = (props: Props) => {
  const [isMessageVisible, setIsMessageVisible] = useState<boolean>(false);

  return (
    <main id="page-wrapper">
      <div id="page-container" className="box">
        <div className="page">
          <SiteHeader />
          <Navigation
            setPageToGlobe={props.setPageToGlobe}
            setPageToTravelList={props.setPageToTravelList}
          />
          <Message
            header={props.isSuccess ? "OK" : "Błąd"}
            type={props.isSuccess ? MessageType.Success : MessageType.Danger}
            visible={!props.isSuccess && isMessageVisible}
            onClick={() => setIsMessageVisible(false)}
          >
            {props.message}
          </Message>
          {props.children}
          <SiteFooter
            username={props.username}
            setPageToLogin={props.setPageToLogin}
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
