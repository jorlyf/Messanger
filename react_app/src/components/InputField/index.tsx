import TextareaAutosize from 'react-textarea-autosize';
import { trimString } from '../../utils';

interface IInputField {
  value: string;
  dispatchFunction: (value: string) => void;
  placeholder: string;
  handleEnter?: () => void;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
  isOneRow?: boolean;
}

const InputField = ({ value, dispatchFunction, placeholder, handleEnter, minRows = 1, maxRows = 6, disabled=false, isOneRow = false }: IInputField) => {
  const handleChange = (e: any) => {
    dispatchFunction(e.target.value);
  }
  const handlePress = (e: any) => { // keyCode 13 - "Enter"
    if (isOneRow && e.keyCode === 13) e.preventDefault();
    if (handleEnter && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleEnter();
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

      disabled={disabled}

      minRows={minRows}
      maxRows={maxRows}
    />
  );
}

export default InputField;