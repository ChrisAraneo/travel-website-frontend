import React from "react";
import "./App.scss";
import Background from "./components/Background/Background";
import Page from "./components/Page/Page";
import config from "./config/config";
import { AuthorGroup } from "./model/AuthorGroup_";
import { Author } from "./model/Author_";
import { MeetingPoint } from "./model/MeetingPoint_";
import { Photo } from "./model/Photo_";
import { Travel } from "./model/Travel_";
import { UploadedPhoto } from "./model/UploadedPhoto_";
import AdminPanelPage from "./pages/AdminPanelPage";
import GlobePage from "./pages/GlobePage";
import LogInGuestPage from "./pages/LoginGuestPage";
import LogInPage from "./pages/LoginPage";
import TravelListPage from "./pages/TravelListPage";
import TravelPage from "./pages/TravelPage";

interface Props {}

interface State {
  page: number;
  token: string;
  username: string;
  meetingpoints: MeetingPoint[];
  authors: Author[];
  authorgroups: AuthorGroup[];
  travels: Travel[];
  photos: Photo[];
  fulltravels: Travel[];
  travel?: Travel;
  travel_prev_id?: string;
  travel_next_id?: string;
  travel_photos: UploadedPhoto[];
  success: boolean;
  message: string;
  scriptLoaded: boolean;
}

const initialState: State = {
  page: 0,
  token: "",
  username: "",
  meetingpoints: [],
  authors: [],
  authorgroups: [],
  travels: [],
  photos: [],
  fulltravels: [],
  travel: undefined,
  travel_prev_id: undefined,
  travel_next_id: undefined,
  travel_photos: [],
  success: true,
  message: "",
  scriptLoaded: false,
};

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = { ...initialState };
  }

  componentWillUnmount = () => {
    // window.location.reload();
  };

  fetchAll = (successCallback: () => any) => {
    if (this.state.token.length === 0) {
      return;
    }

    this.fetchMeetingPoints(() =>
      this.fetchAuthors(() =>
        this.fetchAuthorGroups(() =>
          this.fetchTravels(() =>
            this.fetchPhotos(() => {
              this.setState(
                {
                  fulltravels: this.createFullTravelArray(
                    this.state.travels,
                    this.state.authorgroups,
                    this.state.authors,
                    this.state.meetingpoints,
                    this.state.photos
                  ),
                },
                () => {
                  if (successCallback) {
                    successCallback();
                  }
                }
              );
            })
          )
        )
      )
    );
  };

  fetchMeetingPoints = (successCallback: () => any) => {
    const { token } = this.state;
    if (token.length === 0) {
      return;
    }

    fetch(`${config.url}/api/get/meetingpoints.php?token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState(
          {
            meetingpoints: result.data,
          },
          () => successCallback()
        );
      })
      .catch((error) =>
        this.setState({
          success: false,
          message: String(error),
        })
      );
  };

  fetchAuthors = (successCallback: () => any) => {
    const { token } = this.state;
    if (token.length === 0) {
      return;
    }

    fetch(`${config.url}/api/get/authors.php?token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState(
          {
            authors: result.data,
          },
          () => successCallback()
        );
      })
      .catch((error) =>
        this.setState({
          success: false,
          message: String(error),
        })
      );
  };

  fetchAuthorGroups = (successCallback: () => any) => {
    const { token } = this.state;
    if (token.length === 0) {
      return;
    }

    fetch(`${config.url}/api/get/authorgroups.php?token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState(
          {
            authorgroups: result.data,
          },
          () => successCallback()
        );
      })
      .catch((error) =>
        this.setState({
          success: false,
          message: String(error),
        })
      );
  };

  fetchPhotos = (successCallback: () => any) => {
    const { token } = this.state;
    if (token.length === 0) {
      return;
    }

    fetch(`${config.url}/api/get/photos.php?token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState(
          {
            photos: result.data,
          },
          () => successCallback()
        );
      })
      .catch((error) =>
        this.setState({
          success: false,
          message: String(error),
        })
      );
  };

  fetchTravels = (successCallback: () => any) => {
    const { token } = this.state;
    if (token.length === 0) {
      return;
    }

    fetch(`${config.url}/api/get/travels.php?token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState(
          {
            travels: result.data,
          },
          () => successCallback()
        );
      })
      .catch((error) =>
        this.setState({
          success: false,
          message: String(error),
        })
      );
  };

  fetchPhoto = (
    filename: string,
    successCallback: (result: { data: string }) => any
  ) => {
    const { token } = this.state;
    if (token.length === 0) {
      return;
    }

    fetch(
      `${config.url}/api/get/photo.php?token=${token}&filename=${filename}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        if (successCallback) {
          successCallback(result);
        }
      })
      .catch((error) => {
        this.setState({
          success: false,
          message: String(error),
        });
      });
  };

  createFullTravelArray = (
    travels: any,
    authorgroups: any,
    authors: any,
    meetingpoints: any,
    photos: any
  ): Travel[] => {
    const array = [];

    const denormAuthorGroups: any[] = [];

    authorgroups.forEach((authorgroup: AuthorGroup) => {
      const id_author = authorgroup.id_author;
      const author = authors.find(
        (item: AuthorGroup) => item.id_author === id_author
      );
      denormAuthorGroups.push({
        ...authorgroup,
        ...author,
      });
    });

    for (let i = 0; i < travels.length; ++i) {
      const {
        id_travel,
        title,
        location,
        date,
        hour,
        id_meetingpoint,
        latitude,
        longitude,
        description,
      } = travels[i];

      const travel = {
        id_travel: id_travel,
        title,
        location,
        date: new Date(date),
        hour,
        id_meetingpoint,
        meetingpoint: meetingpoints.find(
          (item: MeetingPoint) => item.id_meetingpoint === id_meetingpoint
        ),
        latitude,
        longitude,
        authors: [
          ...denormAuthorGroups.filter((item) => item.id_travel === id_travel),
        ],
        photos: [
          ...photos.filter((item: Photo) => item.id_travel === id_travel),
        ],
        description,
      };

      array.push(travel);
    }

    array.sort((A, B) => B.date.getTime() - A.date.getTime());

    console.log("FULLTRAVELS", array);

    return array;
  };

  goToTravelListPage = () => {
    this.setState({ page: 4 });
  };

  goToTravelPage = (id: string) => {
    this.setState(
      {
        travel: undefined,
        travel_photos: [],
        travel_next_id: undefined,
        travel_prev_id: undefined,
      },
      () => {
        const { fulltravels } = this.state;
        if (fulltravels.length > 0) {
          let prev = undefined;
          let next = undefined;
          const travel = fulltravels.find((item, i, array) => {
            if (item.id_travel === id) {
              if (array[i + 1]) {
                next = array[i + 1].id_travel;
              }
              if (array[i - 1]) {
                prev = array[i - 1].id_travel;
              }
              return true;
            } else {
              return false;
            }
          });
          if (travel) {
            if (travel.photos) {
              travel.photos.forEach((photo) => {
                this.fetchPhoto(photo.filename, (result: { data: string }) => {
                  const obj: UploadedPhoto = {
                    name: photo.filename,
                    base64: result.data,
                  };
                  this.setState({
                    travel_photos: [...this.state.travel_photos, obj],
                  });
                });
              });
            }
            this.setState(
              { travel, travel_next_id: next, travel_prev_id: prev },
              () => this.setState({ page: 5 })
            );
          } else {
            this.setState(
              {
                travel: undefined,
                travel_next_id: undefined,
                travel_prev_id: undefined,
              },
              () => this.setState({ page: 5 })
            );
          }
        }
      }
    );
  };

  goToPrevTravel = () => {
    if (
      this.state.travel_prev_id !== null &&
      this.state.travel_prev_id !== undefined
    ) {
      this.goToTravelPage(this.state.travel_prev_id);
    }
  };

  goToNextTravel = () => {
    if (
      this.state.travel_next_id !== null &&
      this.state.travel_next_id !== undefined
    ) {
      this.goToTravelPage(this.state.travel_next_id);
    }
  };

  renderPage = () => {
    const loginCallback = (username: string) => {
      if (username === "admin") {
        if (this.state.fulltravels.length < 1) {
          this.setState({ page: 4 }, () =>
            this.fetchAll(() => this.setState({ page: 2 }))
          );
        } else {
          this.setState({ page: 2 });
        }
      } else if (username) {
        this.setState({ page: 4 }, () =>
          this.fetchAll(() => this.setState({ page: 3 }))
        );
      }
    };

    switch (this.state.page) {
      case 0:
        return (
          <LogInGuestPage
            setToken={(token) =>
              this.setState({ token }, () => loginCallback(this.state.username))
            }
            setUsername={(username) =>
              this.setState({ username }, () =>
                loginCallback(this.state.username)
              )
            }
          />
        );
      case 1:
        return (
          <LogInPage
            setToken={(token) => this.setState({ token })}
            setUsername={(username) =>
              this.setState({ username }, () =>
                loginCallback(this.state.username)
              )
            }
          />
        );
      case 2:
        return (
          <AdminPanelPage
            username={this.state.username}
            token={this.state.token}
            meetingPoints={this.state.meetingpoints}
            authors={this.state.authors}
          />
        );
      case 3:
        return (
          <GlobePage
            travels={this.state.fulltravels}
            goToTravelPage={this.goToTravelPage}
          />
        );
      case 4:
        return (
          <TravelListPage
            travels={this.state.fulltravels}
            goToTravelPage={this.goToTravelPage}
          />
        );
      case 5:
        return (
          <TravelPage
            travel={this.state.travel}
            photos={this.state.travel_photos}
            goToTravelListPage={this.goToTravelListPage}
            goToPrevTravel={
              this.state.travel_prev_id !== null
                ? this.goToPrevTravel
                : undefined
            }
            goToNextTravel={
              this.state.travel_next_id !== null
                ? this.goToNextTravel
                : undefined
            }
          />
        );
      default:
        return null;
    }
  };

  render = () => {
    // const bundle = {
    //   token: this.state.token,
    //   username: this.state.username,
    //   success: this.state.success,
    //   message: this.state.message,
    //   authors: this.state.authors,
    //   meetingpoints: this.state.meetingpoints,
    //   authorgroups: this.state.authorgroups,
    //   fulltravels: this.state.fulltravels,
    // };

    return (
      <>
        <Background />
        <Page
          username={this.state.username}
          isSuccess={this.state.success}
          message={this.state.message}
          setPageToLogin={() => this.setState({ page: 1 })}
          setPageToGlobe={
            this.state.page !== 3 && this.state.page >= 2
              ? () => this.setState({ page: 3 })
              : undefined
          }
          setPageToTravelList={
            this.state.page !== 4 && this.state.page >= 2
              ? () => this.setState({ page: 4 })
              : undefined
          }
        >
          {this.renderPage()}
        </Page>
      </>
    );
  };
}
export default App;
