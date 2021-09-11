import { render } from "@testing-library/react";
import Title from "./Title";

describe("<Title />", () => {
  it("Has text inside", () => {
    const text = "Unit testing";
    const documentBody = render(<Title>{text}</Title>);
    expect(documentBody.getByText(text)).toBeInTheDocument();
  });
});
