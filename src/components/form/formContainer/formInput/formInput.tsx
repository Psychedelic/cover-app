import React, {useCallback, useImperativeHandle, useRef, useState} from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {getNameFromLabel} from '@/utils';

import {StitchesFormInput} from './formInput.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesFormInput> {
  css?: CSS;
  textarea?: boolean;
  label: string;
  rows?: number;
  validations?: [(value: string) => boolean];
  errorMessage?: string;
}

export interface FormInputHandler {
  hasError: () => boolean;
}

const hasErrorUtil = (validations: [(value: string) => boolean], value: string): boolean =>
  validations.reduce((result, validation) => result || !validation(value), false as boolean);

export const FormInput = React.forwardRef<FormInputHandler, PropTypes>(
  ({css, textarea, label, rows, validations, errorMessage}, ref) => {
    const [hasError, setHasError] = useState(false);
    const inputRef = useRef(null);
    const onInputOrBlur = useCallback(
      _ => {
        if (inputRef.current && validations) {
          const value = (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value;
          setHasError(Boolean(value) && hasErrorUtil(validations, value));
        }
      },
      [validations]
    );
    const name = getNameFromLabel(label);
    useImperativeHandle(
      ref,
      () => ({
        hasError: () => {
          if (inputRef.current && validations) {
            const value = (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value;
            const hashError = hasErrorUtil(validations, value);
            setHasError(hashError);
            return hashError;
          }
          return false;
        }
      }),
      [validations]
    );
    return (
      <StitchesFormInput css={css} hasError={hasError ? 'true' : 'false'}>
        <label htmlFor={name}>{label}</label>
        {textarea ? (
          <Core.Textarea name={name} onBlur={onInputOrBlur} onInput={onInputOrBlur} ref={inputRef} rows={rows} />
        ) : (
          <Core.Input name={name} onBlur={onInputOrBlur} onInput={onInputOrBlur} ref={inputRef} />
        )}
        {hasError && <span>{errorMessage}</span>}
      </StitchesFormInput>
    );
  }
);
