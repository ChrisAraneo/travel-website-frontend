import { render, RenderResult } from "@testing-library/react";
import Button from "./Button";

let documentBody: RenderResult;
const text = "Testing";

describe("<Button />", () => {
  beforeEach(() => {
    documentBody = render(
      <Button>
        <h1>{text}</h1>
      </Button>
    );
  });
  it("Child element's text is in the document", () => {
    expect(documentBody.getByText(text)).toBeInTheDocument();
  });
});
