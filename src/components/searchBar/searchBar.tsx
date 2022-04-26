import React, {useCallback, useRef, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {hasValueStyled, searchBarStyled} from './searchBar.styled';

export const SearchBar: React.VFC = () => {
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

  const containerStyled = hasValue ? hasValueStyled : searchBarStyled;

  return (
    <Core.InputContainer bg={'gray'} css={containerStyled} icon={faSearch} size={'small'}>
      <Core.Input onInput={onInput} placeholder={'Search by Canister ID'} ref={searchBarRef} size={'small'} />
      {hasValue && (
        <Core.Button onClick={onClick} type={'text'}>
          <FontAwesomeIcon icon={faXmark} size={'lg'} />
        </Core.Button>
      )}
    </Core.InputContainer>
  );
};
