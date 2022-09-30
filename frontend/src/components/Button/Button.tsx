import classNames from "classnames";
import { MouseEventHandler } from "react";
import './Button.css';

export interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  appearance: 'primary' | 'secondary';
  text: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button ({ type, appearance, text, disabled, onClick } : ButtonProps) {
  return <button
    type={type}
    className={classNames('button', appearance === 'secondary' ? 'button button-secondary' : null)}
    disabled={disabled ?? false}
    {...(onClick !== undefined ? { onClick } : {})}
  >{text}</button>
}
