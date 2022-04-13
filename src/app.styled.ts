import {reset} from 'stitches-reset';

import {defaultStitches} from './themes';

const {globalCss} = defaultStitches;

export const globalStyles = globalCss({
  '*, html': {
    'font-family': `'Monaco', sans-serif;`
  },
  body: {
    margin: '0'
  },
  reset
});
