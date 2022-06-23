import React, {createRef, useCallback, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {hasErrorStyled, hasValueStyled, searchBarStyled} from './searchBar.styled';

interface PropTypes {
  onBlurOrEnter?: (value: string) => void;
  validation?: (value: string) => boolean;
  disabled?: boolean;
}

export const SearchBar: React.VFC<PropTypes> = ({onBlurOrEnter, validation, disabled}) => {
  const [hasValue, setHasValue] = useState(false);
  const [hasError, setHasError] = useState(false);
  const searchBarRef = createRef<HTMLInputElement>();

  const search = useCallback(() => {
    if (onBlurOrEnter && searchBarRef.current && validation) {
      const value = (searchBarRef.current as HTMLInputElement).value;
      const hasErr = value !== '' && !validation(value);
      setHasError(hasErr);
      // Only trigger `onBlurOrEnter` when `validation` is passed
      !hasErr && onBlurOrEnter(value);
    }
  }, [onBlurOrEnter, validation, searchBarRef]);

  const onInput = useCallback<React.ReactEventHandler>(
    _ => {
      if (searchBarRef.current) {
        const value = (searchBarRef.current as HTMLInputElement).value;
        setHasValue(value !== '');
        setHasError(false);
      }
    },
    [searchBarRef]
  );

  const onClick = useCallback(() => {
    if (searchBarRef.current) {
      const searchBar = searchBarRef.current as HTMLInputElement;
      searchBar.value = '';
      searchBar.focus();
      setHasValue(false);
      setHasError(false);
    }
  }, [searchBarRef]);

  const onBlur = useCallback(search, [search]);

  const onEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        search();
      }
    },
    [search]
  );

  const containerStyled = hasError ? hasErrorStyled : hasValue && !disabled ? hasValueStyled : searchBarStyled;

  return (
    <Core.InputContainer bg={'gray'} css={containerStyled} icon={faSearch} size={'small'}>
      <Core.Input
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
};
