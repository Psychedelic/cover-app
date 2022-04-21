import React, {ReactEventHandler, useCallback, useState} from 'react';

import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {Core} from '@/components';
import {colors} from '@/themes';

import {StitchesPagination} from './pagination.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesPagination> {
  css?: CSS;
  page: string;
}

export const Pagination: React.VFC<PropTypes> = ({css, page}) => {
  const [value, setValue] = useState(page);
  const [isFirstPage, setIsFirstPage] = useState(value === '1');

  const color = isFirstPage ? colors.coverMediumGray : colors.coverLightWhite;

  const onBlur: ReactEventHandler = useCallback(e => {
    const inputVal = (e.target as HTMLInputElement).value;
    setValue(isPositiveNum(inputVal) ? inputVal : '1');
    setIsFirstPage(isPositiveNum(inputVal) ? inputVal === '1' : true);
  }, []);

  const isPositiveNum = (s: string): boolean => {
    const pattern = /^[1-9][0-9]+$/u;
    return pattern.test(s);
  };

  const onChange: ReactEventHandler = useCallback(
    e => {
      const inputVal = (e.target as HTMLInputElement).value;
      setValue(inputVal);
    },
    [setValue]
  );

  return (
    <StitchesPagination css={css}>
      <Core.Button type={'outline'}>
        <FontAwesomeIcon color={color} icon={faChevronLeft} />{' '}
      </Core.Button>
      <input onBlur={onBlur} onChange={onChange} value={value} />
      <Core.Button type={'outline'}>
        <FontAwesomeIcon icon={faChevronRight} />{' '}
      </Core.Button>
    </StitchesPagination>
  );
};
