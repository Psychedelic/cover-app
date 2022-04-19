import React from 'react';

import {StitchesContainer} from './container.styled';
import {Header} from './header';

export const Container: React.FC = ({children}) => (
  <StitchesContainer>
    <Header />
    {children}
  </StitchesContainer>
);
