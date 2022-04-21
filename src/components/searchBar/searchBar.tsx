import React, {useCallback, useMemo, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';
import {colors} from '@/themes';

import {searchBarStyled} from './searchBar.styled';

export const SearchBar: React.VFC = () => {
  const [hasValue, setHasValue] = useState(false);

  const onInput = useCallback(e => {
    setHasValue((e.target as HTMLInputElement).value !== '');
  }, []);

  const onClick = useCallback(() => {
    const searchBar = document.getElementById('headerSearchBar') as HTMLInputElement;
    if (searchBar) {
      searchBar.value = '';
      setHasValue(false);
    }
  }, []);

  const {containerCss, contentCss} = useMemo(() => {
    const color = hasValue ? colors.coverLightWhite : colors.coverLightGray;
    return {
      containerCss: {...searchBarStyled, color},
      contentCss: {color}
    };
  }, [hasValue]);

  return (
    <Core.InputContainer bg={'gray'} css={containerCss} icon={faSearch} size={'small'}>
      <Core.InputContent
        css={contentCss}
        id={'headerSearchBar'}
        onInput={onInput}
        placeholder={'Search by Canister ID'}
        size={'small'}
      />
      {hasValue && <FontAwesomeIcon icon={faXmark} id={'deleteIcon'} onClick={onClick} />}
    </Core.InputContainer>
  );
};
