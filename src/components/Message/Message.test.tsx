import { fireEvent, render } from "@testing-library/react";
import Message, { MessageType } from "./Message";

const renderMessage = (
  visible: boolean = true,
  type: MessageType = MessageType.Success,
  header: string = "",
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => any = () => {}
) =>
  render(
    <Message
      visible={visible}
      type={type}
      header={header}
      onClick={onClick}
    ></Message>
  );

describe("<Message />", () => {
  it("Is visible and has header text inside", () => {
    const header = "Inside the message";
    const documentBody = renderMessage(true, MessageType.Success, header);
    expect(documentBody.getByText(header)).toBeInTheDocument();
  });
  it("Is not visible and doesn't have text inside", () => {
    const header = "Inside the message";
    const documentBody = renderMessage(false, MessageType.Success, header);
    expect(documentBody.findByText(header)).rejects.toThrowError;
  });
  it("Has success type", () => {
    const documentBody = renderMessage(true, MessageType.Success);
    expect(
      documentBody.container.querySelector(".message.is-success")
    ).toBeInTheDocument();
  });
  it("Has danger type", () => {
    const documentBody = renderMessage(true, MessageType.Danger);
    expect(
      documentBody.container.querySelector(".message.is-danger")
    ).toBeInTheDocument();
  });
  it("Has danger type", () => {
    const documentBody = renderMessage(true, MessageType.Info);
    expect(
      documentBody.container.querySelector(".message.is-info")
    ).toBeInTheDocument();
  });
  it("Function has been called after clicking button", () => {
    const onClick = jest.fn();
    const documentBody = renderMessage(true, MessageType.Info, "", onClick);
    fireEvent.click(documentBody.getByTestId("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
