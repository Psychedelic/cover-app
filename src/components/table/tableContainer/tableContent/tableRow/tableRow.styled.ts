import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableRow = styled('tr', {
  '& button[disabled]': {
    opacity: 0.3,
    '& svg': {
      cursor: 'default',
    }
  }
});
