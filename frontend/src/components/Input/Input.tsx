import { useState } from "react";
import './Input.css';

export interface InputProps {
  label: string;
  id: string;
  type: 'text' | 'password';
  onChange: (value: string, validatorResult?: null | string) => any;
  validator?: (value: string) => (null | string)
};

export function Input ({ type, label, id, onChange, validator }: InputProps) {
  const [value, setValue] = useState<string>('');
  const [validationResult, setValidationResult] = useState<string | null>(null);

  return (
    <>
      <label className='label' htmlFor={id}>{label}</label>
      <input className='input'
        type={type}
        id={id}
        onChange={e => {
          const value = e.target.value;
          setValue(value);

          if (validator !== undefined) {
            const validationResult = validator(value);
            setValidationResult(validationResult);
            onChange(value, validationResult);
          }

          else
            onChange(value);
        }}
        value={value}
        required
      />
      {validationResult !== null ? <div className='validation-error-text'>{validationResult}</div> : null}
    </>
  );
}
