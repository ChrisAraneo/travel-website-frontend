import { render, RenderResult } from "@testing-library/react";
import Background from "./Background";

let documentBody: RenderResult;
const text = "Testing";

describe("<Background />", () => {
  beforeEach(() => {
    documentBody = render(
      <Background>
        <h1>{text}</h1>
      </Background>
    );
  });
  it("Child element's text is in the document", () => {
    expect(documentBody.getByText(text)).toBeInTheDocument();
  });
});
