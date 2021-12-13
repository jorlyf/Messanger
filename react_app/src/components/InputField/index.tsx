import TextareaAutosize from 'react-textarea-autosize';
import { trimString } from '../../utils';

import styles from "./InputField.module.scss";
interface IInputField {
  value: string;
  dispatchFunction: (value: string) => void;
  placeholder: string;
  minRows?: number;
  maxRows?: number;
  isOneRow?: boolean;
}
const InputField = ({ value, dispatchFunction, placeholder, minRows = 1, maxRows = 6, isOneRow = false }: IInputField) => {

  const handleChange = (e: any) => {
    dispatchFunction(e.target.value);
  }
  const handlePress = (e: any) => {
    if (isOneRow && e.key === "Enter") {
      e.preventDefault();
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

export default InputField;