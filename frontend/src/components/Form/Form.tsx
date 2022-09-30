import classNames from "classnames";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Checkbox, CheckboxProps } from "../Checkbox/Checkbox";
import { Input, InputProps } from "../Input/Input";
import './Form.css';

export interface FormProps {
  header: string;
  name: string;
  inputs: (
    Pick<InputProps, 'type' | 'label' | 'validator'> |
    Pick<CheckboxProps, 'label'>
  )[];
  submitText: string;
  size?: 's' | 'm' | 'l';
  bottomChildren?: React.ReactNode;
  onSubmit: (values: (string | boolean)[]) => void;
  validator?: (values: (string | boolean)[]) => (string | null);
}

export function Form ({ header, name, inputs, submitText, size, bottomChildren, onSubmit, validator }: FormProps) {
  const [values, setValues] = useState<(string | boolean)[]>(inputs.map(_ => ''));
  const [validationResults, setValidationResults] = useState<(string | null)[]>(
    inputs.map((input, i) =>
      ('validator' in input) && input.validator !== undefined ?
      input.validator(values[i] as string) :
      null
    )
  );
  const [validationResult, setValidationResult] = useState<string | null>(null);

  return (
    <div className='form-wrapper'>
      <form className={classNames(
        'form',
        size === 's' ? 'form-s' : null,
        (size === undefined || size === 'm') ? 'form-m' : null,
        size === 'l' ? 'form-l' : null
      )}>
        <h2>{header}</h2>
        {
          inputs.map(((input, i) =>
            <div key={i}>{
              'type' in input ?
              <Input
                {...input}
                id={`${name}-form-input-${i}`}
                onChange={(value, validationResult?) => {
                  setValues(values => {
                    values[i] = value;
                    setValidationResult(validator?.(values) ?? null);
                    return [...values];
                  });

                  if (validationResult !== undefined)
                    setValidationResults(prevValidationResults => {
                      prevValidationResults[i] = validationResult;
                      return [...prevValidationResults];
                    });
                }}
              /> :
              <Checkbox
                {...input}
                id={`${name}-form-input-${i}`}
                onChange={(checked) => {
                  setValues(values => {
                    values[i] = checked;
                    setValidationResult(validator?.(values) ?? null);
                    return [...values];
                  });

                  if (validationResult !== undefined)
                    setValidationResults(prevValidationResults => {
                      prevValidationResults[i] = validationResult;
                      return [...prevValidationResults];
                    });
                }}
              />
            }</div>
          ))
        }
        {validationResult !== null ? <div className='validation-error-text'>{validationResult}</div> : null}
        {bottomChildren !== undefined ? bottomChildren : <></>}
        <Button
          appearance='secondary'
          type='submit'
          disabled={validationResults.some(el => el !== null) || validationResult !== null}
          text={submitText}
          onClick={e => {
            e.preventDefault();
            onSubmit(values);
          }}
        />
      </form>
    </div>
  );
}
