import { fireEvent, render } from "@testing-library/react";
import Navigation from "./Navigation";

const renderNavigation = (
  setPageToGlobe?: () => any,
  setPageToTravelList?: () => any
) =>
  render(
    <Navigation
      setPageToGlobe={setPageToGlobe}
      setPageToTravelList={setPageToTravelList}
    ></Navigation>
  );

describe("<Navigation />", () => {
  it("Is not rendered", () => {
    const documentBody = renderNavigation();
    expect(documentBody.container.querySelector("#navigation")).rejects
      .toHaveErrorMessage;
  });
  it("Has working globe page link", () => {
    const setPageToGlobe = jest.fn();
    const documentBody = renderNavigation(setPageToGlobe, () => {});
    fireEvent.click(documentBody.getByTestId("globe-button"));
    expect(setPageToGlobe).toHaveBeenCalledTimes(1);
  });
  it("Has disabled globe page link", () => {
    const documentBody = renderNavigation(undefined, () => {});
    expect(
      documentBody.getByTestId("globe-button").classList.contains("is-active")
    ).toBeFalsy;
  });
  it("Has working travel list page link", () => {
    const setPageToTravelList = jest.fn();
    const documentBody = renderNavigation(() => {}, setPageToTravelList);
    fireEvent.click(documentBody.getByTestId("travel-list-button"));
    expect(setPageToTravelList).toHaveBeenCalledTimes(1);
  });
  it("Has disabled travel list page link", () => {
    const documentBody = renderNavigation(() => {});
    expect(
      documentBody
        .getByTestId("travel-list-button")
        .classList.contains("is-active")
    ).toBeFalsy;
  });
});
