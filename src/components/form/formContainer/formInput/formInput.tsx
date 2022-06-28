import {
  ComponentProps,
  createRef,
  forwardRef,
  ReactEventHandler,
  RefObject,
  useCallback,
  useImperativeHandle,
  useState
} from 'react';

import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {getNameFromLabel, isNotEmpty} from '@/utils';

import {StitchesFormInput} from './formInput.styled';
import {InfoTooltip} from './infoTooltip';

type InputValidations = [(value: string) => boolean];

interface PropTypes extends ComponentProps<typeof StitchesFormInput> {
  css?: CSS;
  textarea?: boolean;
  label?: string;
  rows?: number;
  required?: boolean;
  validations?: InputValidations;
  validationIf?: InputValidations;
  errorMessage?: string;
  infoTooltip?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  onBlurHandler?: (value: string) => void;
}

export interface FormInputHandler {
  hasError: () => boolean;
  value: () => string;
  setValue: (value: string) => void;
}

const isValidateFailed = (validations: [(value: string) => boolean], value: string): boolean =>
  validations.reduce((result, validation) => result || !validation(value), false as boolean);

export const FormInput = forwardRef<FormInputHandler, PropTypes>(
  (
    {
      css,
      defaultValue,
      textarea,
      label,
      rows,
      required,
      validations,
      validationIf,
      errorMessage,
      infoTooltip,
      placeholder,
      disabled,
      onBlurHandler
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);

    const inputRef = createRef<HTMLInputElement | HTMLTextAreaElement>();

    const onBlur = useCallback<ReactEventHandler>(
      _ => {
        if (inputRef.current) {
          const value = (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value;
          onBlurHandler && onBlurHandler(value);
          validations && setHasError(Boolean(value) && isValidateFailed(validations, value));
        }
      },
      [validations, inputRef, onBlurHandler]
    );

    const onInput = useCallback<ReactEventHandler>(_ => {
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
        value: () => (inputRef.current ? (inputRef.current as HTMLInputElement | HTMLTextAreaElement).value : ''),
        setValue: (value: string) => ((inputRef.current as HTMLInputElement | HTMLTextAreaElement).value = value)
      }),
      [required, validations, validationIf, inputRef]
    );

    return (
      <StitchesFormInput css={css} hasError={hasError ? 'true' : 'false'}>
        {label && (
          <div>
            <label htmlFor={name}>{label}</label>
            {infoTooltip && <InfoTooltip info={infoTooltip} />}
          </div>
        )}
        {textarea ? (
          <Core.Textarea
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            onInput={onInput}
            placeholder={placeholder || `Enter ${label}`}
            ref={inputRef as RefObject<HTMLTextAreaElement>}
            rows={rows}
          />
        ) : (
          <Core.Input
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            onBlur={onBlur}
            onInput={onInput}
            placeholder={placeholder || `Enter ${label}`}
            ref={inputRef as RefObject<HTMLInputElement>}
          />
        )}
        {hasError && <span>{errorMessage}</span>}
      </StitchesFormInput>
    );
  }
);
