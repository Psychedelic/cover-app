import {defaultStitches} from '@/themes';
const {styled, keyframes} = defaultStitches;

export const StitchesLoadingContainer = styled('div', {
  position: 'fixed',
  top: '40%',
  left: '40%',
  display: 'flex',
  alignItems: 'center',
  columnGap: 10
});

const rotating = keyframes({
  from: {transform: 'rotate(0deg)'},
  to: {transform: 'rotate(360deg)'}
});

export const StitchesLoadingIcon = styled('img', {
  animation: `${rotating} 1.5s linear infinite`
});

export const StitchesLoadingText = styled('div', {
  color: '#707070',
  fontSize: '16px'
});
