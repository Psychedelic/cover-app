import {cssReset, defaultStitches} from './themes';

const {styled, globalCss} = defaultStitches;

export const globalStyles = globalCss({
  '*, html': {
    'font-family': `'Monaco', sans-serif;`
  },
  cssReset
});

export const MainContainer = styled('div', {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  background: 'linear-gradient(129.83deg, rgba(98, 126, 234, 0.1) 5.76%, rgba(237, 30, 121, 0.1) 91.49%)',
  zIndex: 0
});
