import { useState, FocusEvent, ChangeEvent } from "react";
import s from "./NameInput.module.scss";

interface Props {
  onNameChange: (value: string) => void;
  onCancel?: () => void;
  defaultValue?: string;
}

const NameInput = ({ onNameChange, onCancel, defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue || "");

  const onBlur = () => {
    onNameChange(value);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onNameChange(value);
    }
    if (e.key === "Escape") {
      onCancel?.();
    }
  };

  return (
    <input
      className={s.nameInput}
      onClick={(e) => e.stopPropagation()}
      autoFocus
      value={value}
      onChange={onChange}
      type="text"
      onBlur={onBlur}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />
  );
};

export default NameInput;
