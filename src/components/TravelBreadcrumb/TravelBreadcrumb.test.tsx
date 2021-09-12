import { fireEvent, render } from "@testing-library/react";
import TravelBreadcrumb from "./TravelBreadcrumb";

const renderTravelBreadcrumb = (
  title: string,
  goToTravelListPage: () => any,
  goToPrevTravel?: () => any,
  goToNextTravel?: () => any
) => {
  return render(
    <TravelBreadcrumb
      title={title}
      goToTravelListPage={goToTravelListPage}
      goToPrevTravel={goToPrevTravel}
      goToNextTravel={goToNextTravel}
    ></TravelBreadcrumb>
  );
};

describe("<TravelBreadcrumb />", () => {
  it("Has subpage title inside", () => {
    const text = "Unit testing";
    const documentBody = renderTravelBreadcrumb(text, () => {});
    expect(documentBody.getByText(text)).toBeInTheDocument();
  });
  it("goToTravelListPage function has been executed after clicking link", () => {
    const goToTravelListPage = jest.fn();
    const documentBody = renderTravelBreadcrumb("", goToTravelListPage);
    fireEvent.click(documentBody.getByTestId("travel-list-page-link"));
    expect(goToTravelListPage).toHaveBeenCalledTimes(1);
  });
  it("goToPrevTravel function has been executed after clicking link", () => {
    const goToPrevTravel = jest.fn();
    const documentBody = renderTravelBreadcrumb("", () => {}, goToPrevTravel);
    fireEvent.click(documentBody.getByTestId("prev-travel-link"));
    expect(goToPrevTravel).toHaveBeenCalledTimes(1);
  });
  it("goToNextTravel function has been executed after clicking link", () => {
    const goToNextTravel = jest.fn();
    const documentBody = renderTravelBreadcrumb(
      "",
      () => {},
      undefined,
      goToNextTravel
    );
    fireEvent.click(documentBody.getByTestId("next-travel-link"));
    expect(goToNextTravel).toHaveBeenCalledTimes(1);
  });
});
