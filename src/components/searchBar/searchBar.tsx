import React, {ReactEventHandler, useCallback, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';
import {colors} from '@/themes';

import {searchBarStyled} from './searchBar.styled';

export const SearchBar: React.VFC = () => {
  const [hasValue, setHasValue] = useState(false);

  const onInput: ReactEventHandler = useCallback(
    e => {
      setHasValue((e.target as HTMLInputElement).value !== '');
    },
    [setHasValue]
  );

  const onClick: ReactEventHandler = useCallback(() => {
    const searchBar = document.getElementById('headerSearchBar') as HTMLInputElement;
    if (searchBar) {
      searchBar.value = '';
      setHasValue(false);
    }
  }, [setHasValue]);

  const color = hasValue ? colors.coverLightWhite : colors.coverLightGray;

  return (
    <Core.InputContainer bg={'gray'} css={{...searchBarStyled, color}} icon={faSearch} size={'small'}>
      <Core.InputContent
        css={{color}}
        id={'headerSearchBar'}
        onInput={onInput}
        placeholder={'Search by Canister ID'}
        size={'small'}
      />
      {hasValue && <FontAwesomeIcon icon={faXmark} id={'deleteIcon'} onClick={onClick} />}
    </Core.InputContainer>
  );
};
