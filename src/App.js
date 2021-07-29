import React from "react";
import Background from "./components/Background/Background";
import Page from "./components/Page";
import config from "./config/config";
import AdminPanelPage from "./pages/AdminPanelPage";
import GlobePage from "./pages/GlobePage";
import LogInGuestPage from "./pages/LogInGuestPage";
import LogInPage from "./pages/LogInPage";
import TravelListPage from "./pages/TravelListPage";
import TravelPage from "./pages/TravelPage";
import "./styles/index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderPage = this.renderPage.bind(this);
    this.fetchMeetingPoints = this.fetchMeetingPoints.bind(this);
    this.fetchAuthors = this.fetchAuthors.bind(this);
    this.fetchAuthorGroups = this.fetchAuthorGroups.bind(this);
    this.fetchAll = this.fetchAll.bind(this);
    this.createFullTravelArray = this.createFullTravelArray.bind(this);

    this.goToTravelListPage = this.goToTravelListPage.bind(this);
    this.goToTravelPage = this.goToTravelPage.bind(this);
    this.goToPrevTravel = this.goToPrevTravel.bind(this);
    this.goToNextTravel = this.goToNextTravel.bind(this);
  }

  state = {
    page: 0,
    token: null,
    username: null,

    meetingpoints: [],
    authors: [],
    authorgroups: [],
    travels: [],
    photos: [],

    fulltravels: [],

    travel: null,
    travel_prev_id: null,
    travel_next_id: null,
    travel_photos: [],

    success: true,
    message: "",

    scriptLoaded: false,
  };

  componentWillUnmount() {
    // window.location.reload();
  }

  fetchAll(successCallback) {
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
  }

  fetchMeetingPoints(successCallback) {
    fetch(`${config.url}/api/get/meetingpoints.php?token=${this.state.token}`, {
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
  }

  fetchAuthors(successCallback) {
    fetch(`${config.url}/api/get/authors.php?token=${this.state.token}`, {
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
  }

  fetchAuthorGroups(successCallback) {
    fetch(`${config.url}/api/get/authorgroups.php?token=${this.state.token}`, {
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
  }

  fetchPhotos(successCallback) {
    fetch(`${config.url}/api/get/photos.php?token=${this.state.token}`, {
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
  }

  fetchTravels(successCallback) {
    fetch(`${config.url}/api/get/travels.php?token=${this.state.token}`, {
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
  }

  fetchPhoto(filename, successCallback) {
    fetch(
      `${config.url}/api/get/photo.php?token=${this.state.token}&filename=${filename}`,
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
  }

  createFullTravelArray(travels, authorgroups, authors, meetingpoints, photos) {
    const array = [];

    const denormAuthorGroups = [];

    authorgroups.forEach((authorgroup) => {
      const id_author = authorgroup.id_author;
      const author = authors.find((item) => item.id_author == id_author);
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
        meetingpoint: meetingpoints.find(
          (item) => item.id_meetingpoint == id_meetingpoint
        ),
        latitude,
        longitude,
        authors: [
          ...denormAuthorGroups.filter((item) => item.id_travel == id_travel),
        ],
        photos: [...photos.filter((item) => item.id_travel == id_travel)],
        description,
      };

      array.push(travel);
    }

    array.sort((A, B) => B.date - A.date);

    return array;
  }

  goToTravelListPage() {
    this.setState({ page: 4 });
  }

  goToTravelPage(id) {
    this.setState(
      {
        travel: null,
        travel_photos: [],
        travel_next_id: null,
        travel_prev_id: null,
      },
      () => {
        const { fulltravels } = this.state;
        if (fulltravels.length > 0) {
          let prev = null;
          let next = null;
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
                this.fetchPhoto(photo.filename, (photo) => {
                  const obj = {
                    original: photo.data,
                    thumbnail: photo.data,
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
              { travel: null, travel_next_id: null, travel_prev_id: null },
              () => this.setState({ page: 5 })
            );
          }
        }
      }
    );
  }

  goToPrevTravel() {
    if (
      this.state.travel_prev_id !== null &&
      this.state.travel_prev_id !== undefined
    ) {
      this.goToTravelPage(this.state.travel_prev_id);
    }
  }

  goToNextTravel() {
    if (
      this.state.travel_next_id !== null &&
      this.state.travel_next_id !== undefined
    ) {
      this.goToTravelPage(this.state.travel_next_id);
    }
  }

  renderPage(bundle) {
    const loginCallback = (username) => {
      if (username === "admin") {
        if (this.state.fulltravels.length < 1) {
          this.setState(
            { page: 4 },
            this.fetchAll(() => this.setState({ page: 2 }))
          );
        } else {
          this.setState({ page: 2 });
        }
      } else if (username) {
        this.setState(
          { page: 4 },
          this.fetchAll(() => this.setState({ page: 3 }))
        );
      }
    };

    switch (this.state.page) {
      case 0:
        return (
          <LogInGuestPage
            bundle={bundle}
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
            bundle={bundle}
            setToken={(token) => this.setState({ token })}
            setUsername={(username) =>
              this.setState({ username }, () =>
                loginCallback(this.state.username)
              )
            }
          />
        );
      case 2:
        return <AdminPanelPage bundle={bundle} />;
      case 3:
        return (
          <GlobePage bundle={bundle} goToTravelPage={this.goToTravelPage} />
        );
      case 4:
        return (
          <TravelListPage
            bundle={bundle}
            goToTravelPage={this.goToTravelPage}
          />
        );
      case 5:
        return (
          <TravelPage
            bundle={bundle}
            travel={this.state.travel}
            photos={this.state.travel_photos}
            goToTravelListPage={this.goToTravelListPage}
            goToPrevTravel={
              this.state.travel_prev_id !== null ? this.goToPrevTravel : null
            }
            goToNextTravel={
              this.state.travel_next_id !== null ? this.goToNextTravel : null
            }
          />
        );
      default:
        return null;
    }
  }

  render() {
    const bundle = {
      token: this.state.token,
      username: this.state.username,
      success: this.state.success,
      message: this.state.message,
      authors: this.state.authors,
      meetingpoints: this.state.meetingpoints,
      authorgroups: this.state.authorgroups,
      fulltravels: this.state.fulltravels,
    };

    return (
      <>
        <Background />
        <Page
          bundle={bundle}
          setPageToLogin={() => this.setState({ page: 1 })}
          setPageToGlobe={
            this.state.page !== 3 && this.state.page >= 2
              ? () => this.setState({ page: 3 })
              : null
          }
          setPageToTravelList={
            this.state.page !== 4 && this.state.page >= 2
              ? () => this.setState({ page: 4 })
              : null
          }
        >
          {this.renderPage(bundle)}
        </Page>
      </>
    );
  }
}
export default App;
