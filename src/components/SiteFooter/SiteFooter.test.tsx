import { fireEvent, render } from "@testing-library/react";
import SiteFooter from "./SiteFooter";

const renderSiteFooter = (username?: string, setPageToLogin?: () => any) =>
  render(
    <SiteFooter
      username={username}
      setPageToLogin={setPageToLogin}
    ></SiteFooter>
  );

describe("<SiteFooter />", () => {
  it("Has text on currently logged user", () => {
    const username = "admin";
    const documentBody = renderSiteFooter(username);
    expect(documentBody.getByText(`${username}`));
  });
  it("Has working login to admin panel link", () => {
    const setPageToLogin = jest.fn();
    const documentBody = renderSiteFooter(undefined, setPageToLogin);
    fireEvent.click(documentBody.getByTestId("admin-panel-link"));
    expect(setPageToLogin).toHaveBeenCalledTimes(1);
  });
  it("Has invisible login to admin panel link", () => {
    const documentBody = renderSiteFooter();
    expect(
      documentBody.queryByTestId("admin-panel-link")
    ).not.toBeInTheDocument();
  });
});
