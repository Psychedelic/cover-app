import React, {useCallback, useRef, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {hasErrorStyled, hasValueStyled, searchBarStyled} from './searchBar.styled';

interface PropTypes {
  onBlur?: (value: string) => void;
  validation?: (value: string) => boolean;
  disabled?: boolean;
}

export const SearchBar: React.VFC<PropTypes> = ({onBlur, validation, disabled}) => {
  const [hasValue, setHasValue] = useState(false);
  const [hasError, setHasError] = useState(false);
  const searchBarRef = useRef(null);

  const onInput = useCallback(
    _ => {
      if (searchBarRef.current) {
        const value = (searchBarRef.current as HTMLInputElement).value;
        setHasValue(value !== '');
        validation && setHasError(value !== '' && !validation(value));
      }
    },
    [validation]
  );

  const onClick = useCallback(() => {
    if (searchBarRef.current) {
      const searchBar = searchBarRef.current as HTMLInputElement;
      searchBar.value = '';
      searchBar.focus();
      setHasValue(false);
      setHasError(false);
    }
  }, []);

  const onBlurInternal = useCallback(
    _ => {
      if (onBlur && searchBarRef.current) {
        const searchBar = searchBarRef.current as HTMLInputElement;
        // Only trigger `onBlur` when `validation` is passed
        !hasError && onBlur(searchBar.value);
      }
    },
    [onBlur, hasError]
  );

  const containerStyled = hasError ? hasErrorStyled : hasValue ? hasValueStyled : searchBarStyled;

  return (
    <Core.InputContainer bg={'gray'} css={containerStyled} icon={faSearch} size={'small'}>
      <Core.Input
        disabled={disabled}
        onBlur={onBlurInternal}
        onInput={onInput}
        placeholder={'Search by Canister ID'}
        ref={searchBarRef}
        size={'small'}
      />
      {hasValue && (
        <Core.Button onClick={onClick} type={'text'}>
          <FontAwesomeIcon icon={faXmark} size={'lg'} />
        </Core.Button>
      )}
    </Core.InputContainer>
  );
};
