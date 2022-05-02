import React, {useCallback, useRef, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {hasValueStyled, searchBarStyled} from './searchBar.styled';

interface PropTypes {
  onBlur?: (value: string) => void;
}

export const SearchBar: React.VFC<PropTypes> = ({onBlur}) => {
  const [hasValue, setHasValue] = useState(false);
  const searchBarRef = useRef(null);

  const onInput = useCallback(_ => {
    if (searchBarRef.current) {
      setHasValue((searchBarRef.current as HTMLInputElement).value !== '');
    }
  }, []);

  const onClick = useCallback(() => {
    if (searchBarRef.current) {
      const searchBar = searchBarRef.current as HTMLInputElement;
      searchBar.value = '';
      searchBar.focus();
      setHasValue(false);
    }
  }, []);

  const onBlurInternal = useCallback(
    _ => {
      if (onBlur && searchBarRef.current) {
        const searchBar = searchBarRef.current as HTMLInputElement;
        onBlur(searchBar.value);
      }
    },
    [onBlur]
  );

  const containerStyled = hasValue ? hasValueStyled : searchBarStyled;

  return (
    <Core.InputContainer bg={'gray'} css={containerStyled} icon={faSearch} size={'small'}>
      <Core.Input
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
