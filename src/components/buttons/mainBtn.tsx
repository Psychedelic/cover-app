import React from 'react';

import PropTypes, {InferProps} from 'prop-types';

import {Button} from './mainBtn.styled';

const MainBtnPropTypes = {
  styled: PropTypes.object,
  children: PropTypes.node
};

export const MainBtn: React.FC<InferProps<typeof MainBtnPropTypes>> = props => (
  <Button css={{...props.styled}}>{props.children}</Button>
);

MainBtn.propTypes = MainBtnPropTypes;
