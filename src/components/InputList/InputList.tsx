import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { InputResetRef } from "../../types/InputResetRef";
import { Valid } from "../../types/Valid";

interface Props {
  label: string;
  value: string;
  data: any[];
  icon: IconProp;
  buttonText: string;
  errorMessage: string;
  name: (input: any) => string;
  // remove: (input: any) => any;
  complete: (data?: any[]) => any;
}

const InputList: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<InputResetRef>
> = forwardRef<InputResetRef, Props>(
  (props: Props, ref: ForwardedRef<InputResetRef>) => {
    const [selectedItems, setSelectedItems] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [valid, setValid] = useState<Valid>(Valid.NotValidated);

    useEffect(() => {
      validate(selectedItems);
    }, [selectedItems]);

    useEffect(() => {
      if (selectedIndex < 0 && props.data) {
        if (props.data.length > 0) {
          setSelectedIndex(props.data[0][props.value]);
        }
      }
    }, []);

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event?.target?.value;
      const valueNumber = Number(value);
      if (!isNaN(valueNumber)) {
        setSelectedIndex(valueNumber);
      }
    };

    const addToSelected = (item: any) => {
      const value = item[props.value];
      for (let i = 0; i < selectedItems.length; i++) {
        if (selectedItems[i][props.value] === value) {
          return;
        }
      }
      setSelectedItems([...selectedItems, item]);
    };

    const removeFromSelected = (item: any) => {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem: any) => selectedItem[props.value] !== item
        )
      );
    };

    const validate = (items: any[]) => {
      const isValid = items.length < 1;
      const itemsOrUndefined = isValid ? items : undefined;
      setValid(isValid ? Valid.Valid : Valid.Invalid);
      props.complete(itemsOrUndefined);
    };

    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelectedItems([]);
        setSelectedIndex(-1);
        setValid(Valid.NotValidated);
      },
    }));

    return (
      <div className="field">
        <label className="label">{props.label}</label>
        {selectedItems.length > 0 ? (
          <div style={{ marginBottom: ".75em" }}>
            <ul
              className="list"
              style={{ boxSizing: "border-box", border: "1px solid #48c774" }}
            >
              {selectedItems.map((item) => (
                <li
                  key={item[props.value]}
                  className="list-item"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {props.name(item)}
                  <a
                    className="delete is-small"
                    style={{ display: "block", lineHeight: "18px" }}
                    onClick={() => removeFromSelected(item[props.value])}
                  ></a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="field is-grouped">
          <div className="control is-expanded has-icons-left">
            <div
              className={`select ${valid === Valid.Invalid ? "is-danger" : ""}`}
              style={{ width: "100%" }}
            >
              <select
                onChange={onChange}
                value={selectedIndex}
                style={{ width: "100%" }}
              >
                {props.data
                  ? props.data.map((item: any, index: number) => {
                      return (
                        <option key={item[props.value]} value={index}>
                          {" "}
                          {props.name(item)}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={props.icon} />
            </span>
          </div>
          <div className="control">
            {props.data ? (
              props.data.length > 0 ? (
                <button
                  className="button is-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    const index = selectedIndex;
                    const item = props.data[index];
                    addToSelected(item);
                  }}
                >
                  {props.buttonText}
                </button>
              ) : null
            ) : null}
          </div>
        </div>
        {!valid ? <p className="help is-danger">{props.errorMessage}</p> : null}
      </div>
    );
  }
);

export default InputList;
