import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useState } from "react";
import { Valid } from "../../model/valid";

interface Props {
  label: string;
  items: any;
  nameProperty: string;
  valueProperty: string;
  icon: IconProp;
  errorMessage: string;
  complete: (index: number | undefined) => any;
}

const InputSelect: React.FC<Props> = (props: Props) => {
  const [valid, setValid] = useState<Valid>(Valid.NotValidated);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = Number(event?.target?.value);
    if (!isNaN(index)) {
      setSelectedItemIndex(-1);
    }
    setSelectedItemIndex(index);
    validate(index, props.items);
  };

  const validate = (index: number, items: any[]) => {
    const isIndexValid = index >= 0;
    const isSelectedItemInItems = isIndexValid
      ? items.findIndex((item: any) => {
          item[props.valueProperty] === index;
        }) > -1
      : false;
    const isValid = isIndexValid && isSelectedItemInItems;
    const indexNumberOrUndefined = isValid ? index : undefined;
    props.complete(indexNumberOrUndefined);
    setValid(isValid ? Valid.Valid : Valid.NotValidated);
  };

  return (
    <div className="field">
      <label className="label">{props.label}</label>
      <div className="control has-icons-left">
        <div
          className={`select ${
            valid === Valid.Valid
              ? "is-success"
              : valid === Valid.Invalid
              ? "is-danger"
              : ""
          }`}
          style={{ width: "100%" }}
        >
          <select
            onChange={onChange}
            value={selectedItemIndex}
            style={{ width: "100%" }}
          >
            <option value={-1}>Wybierz...</option>
            {props.items?.length > 0 &&
              props.items.map((item: any) => (
                <option
                  key={item[props.valueProperty]}
                  value={Number(item[props.valueProperty])}
                >
                  {item[props.nameProperty]}
                </option>
              ))}
          </select>
        </div>
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={props.icon} />
        </span>
      </div>
      {valid === Valid.Invalid && (
        <p className="help is-danger">{props.errorMessage}</p>
      )}
    </div>
  );
};

export default InputSelect;
