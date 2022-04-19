import React, {ReactEventHandler, useCallback, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';
import {colors} from '@/themes';

import {searchBarStyled} from './searchBar.styled';

export const SearchBar: React.FC = () => {
  const [hasValue, setHasValue] = useState(false);

  const onInput: ReactEventHandler = useCallback(
    e => {
      const value = (e.target as HTMLInputElement).value;
      value === '' ? setHasValue(false) : setHasValue(true);
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

  const iconColorByValue = (value: boolean) => (value ? colors.coverMediumWhite : colors.coverLightGray);

  return (
    <Core.InputContainer
      bg={'gray'}
      css={searchBarStyled}
      icon={faSearch}
      iconColor={iconColorByValue(hasValue)}
      size={'small'}>
      <Core.InputContent
        id={'headerSearchBar'}
        onInput={onInput}
        placeholder={'Search by Canister ID'}
        size={'small'}
      />
      {hasValue && <FontAwesomeIcon icon={faXmark} id={'deleteIcon'} onClick={onClick} />}
    </Core.InputContainer>
  );
};
