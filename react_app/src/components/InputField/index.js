import TextareaAutosize from 'react-textarea-autosize';
import { trimString } from '../../utils';

import styles from "./InputField.module.scss";

export function InputField({ value, dispatchFunction, placeholder, minRows = 1, maxRows = 6, isOneRow = false }) {

  const handleChange = (e) => {
    dispatchFunction(e.target.value);
  }
  const handlePress = (e) => {
    if (isOneRow && e.key === "Enter") {
      e.PreventDefault();
    }
  }
  const handleUnfocus = () => {
    const newValue = trimString(value); // trimmed
    dispatchFunction(newValue);
  }

  return (
    <TextareaAutosize
      onKeyDown={handlePress}
      onChange={handleChange}
      onBlur={handleUnfocus}
      value={value}
      placeholder={placeholder}
      className={styles.main}

      minRows={minRows}
      maxRows={maxRows}
    />
  );
}