import React from 'react';

import {Header} from '@/parts';

import {StitchesContainer} from './container.styled';

export const Container: React.FC = ({children}) => (
  <StitchesContainer>
    <Header />
    {children}
  </StitchesContainer>
);
