import TextareaAutosize from 'react-textarea-autosize';
import { trimString } from '../../utils';

import styles from "./InputField.module.scss";
interface IInputField {
  value: string;
  dispatchFunction: (value: string) => void;
  placeholder: string;
  handleEnter?: () => void;
  minRows?: number;
  maxRows?: number;
  isOneRow?: boolean;
}
const InputField = ({ value, dispatchFunction, placeholder, handleEnter, minRows = 1, maxRows = 6, isOneRow = false }: IInputField) => {

  const handleChange = (e: any) => {
    console.log(e);
    
    dispatchFunction(e.target.value);
  }
  const handlePress = (e: any) => {
    if (isOneRow && e.keyCode === 13) e.preventDefault();
    if (handleEnter && e.keyCode === 13 && !e.shiftKey) handleEnter();
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