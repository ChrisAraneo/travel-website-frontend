import React from "react";
import Message, { MessageType } from "../components/Message/Message";
import { Travel } from "../model/Travel";

interface Props {
  travels: Travel[];
  goToTravelPage: (travelId: number) => any;
}

interface State {
  loaded: boolean;
  messageVisible: boolean;
}

const initialState: State = {
  loaded: false,
  messageVisible: true,
};

class GlobePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...initialState };
  }

  initialize = () => {
    const iframe: any = document.getElementById("globe-iframe");
    if (iframe) {
      iframe["contentWindow"]["clickFunction"] = (id: any) => {
        this.props.goToTravelPage(id);
      };
    }
  };

  addMarkers = () => {
    const iframe: any = document.getElementById("globe-iframe");
    if (iframe) {
      const addMarker = iframe.contentWindow.addMarker;
      this.props.travels.forEach((travel: Travel) => {
        addMarker(
          Number(travel.latitude),
          Number(travel.longitude),
          travel.location,
          "author",
          Number(travel.id_travel)
        );
      });
    }
  };

  render = () => {
    return (
      <>
        <Message
          header={"Ładowanie"}
          type={MessageType.Info}
          visible={!this.state.loaded && this.state.messageVisible}
          onClick={() => this.setState({ messageVisible: false })}
        >
          Trwa ładowanie globusu. Proszę czekać.
        </Message>
        <div id="globe-container" className="box">
          <iframe
            id="globe-iframe"
            src={process.env.PUBLIC_URL + "/globe.html"}
            onLoad={() =>
              this.setState({ loaded: true }, () => {
                this.initialize();
                this.addMarkers();
              })
            }
            style={{}}
          />
        </div>
      </>
    );
  };
}

export default GlobePage;
