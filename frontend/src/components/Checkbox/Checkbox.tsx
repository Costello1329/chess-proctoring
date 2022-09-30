import { useState } from "react";
import './Checkbox.css';

export interface CheckboxProps {
  label: string;
  id: string;
  onChange: (checked: boolean) => any;
};

export function Checkbox ({ label, id, onChange }: CheckboxProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <input
        type={'checkbox'}
        id={id}
        className='checkbox'
        onChange={e => {
          const checked = e.target.checked;
          setChecked(checked);
          onChange(checked);
        }}
        checked={checked}
        required
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
}
