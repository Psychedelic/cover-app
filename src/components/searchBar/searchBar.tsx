import React, {useCallback, useMemo, useRef, useState} from 'react';

import {faSearch, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';
import {colors} from '@/themes';

import {searchBarStyled} from './searchBar.styled';

export const SearchBar: React.VFC = () => {
  const [hasValue, setHasValue] = useState(false);
  const searchBarRef = useRef(null);

  const onInput = useCallback(e => {
    setHasValue((e.target as HTMLInputElement).value !== '');
  }, []);

  const onClick = useCallback(() => {
    if (searchBarRef.current) {
      (searchBarRef.current as HTMLInputElement).value = '';
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
        onInput={onInput}
        placeholder={'Search by Canister ID'}
        ref={searchBarRef}
        size={'small'}
      />
      {hasValue && <FontAwesomeIcon icon={faXmark} onClick={onClick} />}
    </Core.InputContainer>
  );
};
