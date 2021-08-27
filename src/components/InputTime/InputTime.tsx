import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { InputResetRef } from "../../types/InputResetRef";
import { Valid } from "../../types/Valid";

export const validateTime = (timeString: any) =>
  typeof timeString === "string" && timeString.length === 5;

interface Props {
  label: string;
  errorMessage: string;
  complete: (text?: string) => any;
}

const InputTime: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<InputResetRef>
> = forwardRef<InputResetRef, Props>(
  (props: Props, ref: ForwardedRef<InputResetRef>) => {
    const [valid, setValid] = useState<Valid>(Valid.NotValidated);
    const [timeString, setTimeString] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const time = event.target.value;
      setTimeString(time);
    };

    const validate = (timeString: string) => {
      const isValid = validateTime(timeString);
      const timeStringOrUndefined = isValid ? timeString : undefined;
      setValid(isValid ? Valid.Valid : Valid.Invalid);
      props.complete(timeStringOrUndefined);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        setValid(Valid.NotValidated);
        setTimeString("");
      },
    }));

    return (
      <div className="field">
        <label className="label">{props.label}</label>
        <div className="control has-icons-left">
          <input
            className={`input ${
              valid === Valid.Valid
                ? "is-success"
                : valid === Valid.Invalid
                ? "is-danger"
                : ""
            }`}
            value={timeString}
            type="time"
            onChange={onChange}
            onBlur={() => validate(timeString)}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faClock} />
          </span>
        </div>
        {valid === Valid.Invalid ? (
          <p className="help is-danger">{props.errorMessage}</p>
        ) : null}
      </div>
    );
  }
);

export default InputTime;
