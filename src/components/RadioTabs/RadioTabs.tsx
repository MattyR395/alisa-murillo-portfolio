import { Fragment, useId, useState } from "react";
import style from "./RadioTabs.module.scss";

export default function RadioTabs(props: {
  options: { label: string; value: string }[];
  selectedValue?: string;
  onChange: (value: string) => void;
}): JSX.Element {
  const [checked, setChecked] = useState(
    props.selectedValue || props.options[0].value
  );
  const id = useId();

  const handleChange = (value: string) => {
    setChecked(value);
    props.onChange(value);
  };

  return (
    <div className={style["radio-group"]}>
      {props.options.map(({ label, value }) => (
        <Fragment key={value}>
          <input
            type="radio"
            id={`${id}-${value}`}
            name={id}
            value={value}
            onChange={() => handleChange(value)}
            checked={value === checked}
          />
          <label htmlFor={`${id}-${value}`}>{label}</label>
        </Fragment>
      ))}
    </div>
  );
}
