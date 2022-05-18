import React, {useCallback, useImperativeHandle, useRef, useState} from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {getNameFromLabel, isNotEmpty} from '@/utils';

import {StitchesFormInput} from './formInput.styled';
import {InfoTooltip} from './infoTooltip';

type InputValidations = [(value: string) => boolean];

interface PropTypes extends React.ComponentProps<typeof StitchesFormInput> {
  css?: CSS;
  textarea?: boolean;
  label: string;
  rows?: number;
  required?: boolean;
  validations?: InputValidations;
  validationIf?: InputValidations;
  errorMessage?: string;
  infoTooltip?: string;
}

export interface FormInputHandler {
  hasError: () => boolean;
  value: () => string;
}

const isValidateFailed = (validations: [(value: string) => boolean], value: string): boolean =>
  validations.reduce((result, validation) => result || !validation(value), false as boolean);

export const FormInput = React.forwardRef<FormInputHandler, PropTypes>(
  ({css, textarea, label, rows, required, validations, validationIf, errorMessage, infoTooltip}, ref) => {
    const [hasError, setHasError] = useState(false);
    const inputRef = useRef(null);

    const onBlur = useCallback(
      _ => {
        if (inputRef.current && validations) {
          const value = (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value;
          setHasError(Boolean(value) && isValidateFailed(validations, value));
        }
      },
      [validations]
    );

    const onInput = useCallback(_ => {
      setHasError(false);
    }, []);

    const name = getNameFromLabel(label);
    useImperativeHandle(
      ref,
      () => ({
        hasError: () => {
          if (inputRef.current && validations) {
            const value = (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value;
            const isGotError = (Boolean(required) || isNotEmpty(value)) && isValidateFailed(validations, value);
            setHasError(
              isGotError ||
                (Boolean(validationIf) &&
                  !isValidateFailed(validationIf as InputValidations, value) &&
                  isValidateFailed(validations, value))
            );
            return isGotError;
          }
          return false;
        },
        value: () => (inputRef.current ? (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value : '')
      }),
      [required, validations, validationIf]
    );

    return (
      <StitchesFormInput css={css} hasError={hasError ? 'true' : 'false'}>
        <div>
          <label htmlFor={name}>{label}</label>
          {infoTooltip && <InfoTooltip info={infoTooltip} />}
        </div>
        {textarea ? (
          <Core.Textarea
            name={name}
            onBlur={onBlur}
            onInput={onInput}
            placeholder={`Enter ${label}`}
            ref={inputRef}
            rows={rows}
          />
        ) : (
          <Core.Input name={name} onBlur={onBlur} onInput={onInput} placeholder={`Enter ${label}`} ref={inputRef} />
        )}
        {hasError && <span>{errorMessage}</span>}
      </StitchesFormInput>
    );
  }
);
