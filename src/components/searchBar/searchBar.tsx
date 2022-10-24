import {forwardRef, KeyboardEvent, ReactEventHandler, useCallback, useImperativeHandle, useRef, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {hasErrorStyled, hasValueStyled, searchBarStyled} from './searchBar.styled';

interface PropTypes {
  onBlurOrEnter?: (value: string) => void;
  validation?: (value: string) => boolean;
  disabled?: boolean;
  defaultValue?: string;
}

export interface SearchBarHandler {
  clearInput: () => void;
}

export const SearchBar = forwardRef<SearchBarHandler, PropTypes>(
  ({onBlurOrEnter, validation, disabled, defaultValue}, ref) => {
    const [hasValue, setHasValue] = useState(Boolean(defaultValue)),
      [hasError, setHasError] = useState(false);

    const searchBarRef = useRef<HTMLInputElement>(null);

    const search = useCallback(() => {
      if (onBlurOrEnter && searchBarRef.current && validation) {
        const value = (searchBarRef.current as HTMLInputElement).value;
        const hasErr = value !== '' && !validation(value);
        setHasError(hasErr);
        // Only trigger `onBlurOrEnter` when `validation` is passed
        !hasErr && onBlurOrEnter(value);
      }
    }, [onBlurOrEnter, validation]);

    const onInput = useCallback<ReactEventHandler>(_ => {
      if (searchBarRef.current) {
        const value = (searchBarRef.current as HTMLInputElement).value;
        setHasValue(value !== '');
        setHasError(false);
      }
    }, []);

    const onClick = useCallback(() => {
      if (searchBarRef.current) {
        const searchBar = searchBarRef.current as HTMLInputElement;
        searchBar.value = '';
        searchBar.focus();
        setHasValue(false);
        setHasError(false);
      }
    }, []);

    const onBlur = useCallback(search, [search]);

    const onEnter = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          search();
        }
      },
      [search]
    );

    const containerStyled = hasError ? hasErrorStyled : hasValue && !disabled ? hasValueStyled : searchBarStyled;

    useImperativeHandle(
      ref,
      () => ({
        clearInput: () => {
          (searchBarRef.current as HTMLInputElement).value = '';
          setHasValue(false);
          setHasError(false);
        }
      }),
      []
    );

    return (
      <Core.InputContainer bg={'gray'} css={containerStyled} icon={faSearch} size={'small'}>
        <Core.Input
          defaultValue={defaultValue}
          disabled={disabled}
          onBlur={onBlur}
          onInput={onInput}
          onKeyPress={onEnter}
          placeholder={'Search by Canister ID'}
          ref={searchBarRef}
          size={'small'}
        />
        {hasValue && (
          <Core.Button disabled={disabled} kind={'text'} onClick={onClick}>
            <FontAwesomeIcon icon={faXmark} size={'lg'} />
          </Core.Button>
        )}
      </Core.InputContainer>
    );
  }
);
