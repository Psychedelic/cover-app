import {createRef, FC, KeyboardEvent, ReactEventHandler, useCallback, useState} from 'react';

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

export const SearchBar: FC<PropTypes> = ({onBlurOrEnter, validation, disabled, defaultValue}) => {
  const [hasValue, setHasValue] = useState(Boolean(defaultValue));
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

  const onInput = useCallback<ReactEventHandler>(
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
    (e: KeyboardEvent) => {
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
};
