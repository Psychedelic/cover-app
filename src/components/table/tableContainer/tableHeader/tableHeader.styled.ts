import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableHeader = styled('thead', {
  '& th': {
    '&:first-of-type': {
      width: '$40',
      textAlign: 'center'
    }
  }
});
