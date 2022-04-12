import React from 'react';

import PropTypes, {InferProps} from 'prop-types';

import {Button} from './mainBtn.styled';

const MainBtnPropTypes = {
  styled: PropTypes.object,
  textContent: PropTypes.string
};

export const MainBtn: React.VFC<InferProps<typeof MainBtnPropTypes>> = props => (
  <Button css={{...props.styled}}>{props.textContent}</Button>
);

MainBtn.propTypes = MainBtnPropTypes;
