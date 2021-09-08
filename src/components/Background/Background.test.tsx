import { render, RenderResult } from "@testing-library/react";
import Background from "./Background";

let documentBody: RenderResult;
const text = "Testing";
const id = "background";
const imageUrl = "background.jpg";

describe("<Background />", () => {
  beforeEach(() => {
    documentBody = render(
      <Background imageUrl={imageUrl}>
        <h1>{text}</h1>
      </Background>
    );
  });
  it("Child element's text is in the document", () => {
    expect(documentBody.getByText(text)).toBeInTheDocument();
  });
  it("Element has correct background image", () => {
    expect(documentBody.container.querySelector(`#${id}`)).toHaveStyle(
      `background-image: url(${imageUrl});`
    );
  });
});
