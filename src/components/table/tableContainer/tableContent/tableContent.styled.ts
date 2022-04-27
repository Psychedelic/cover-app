import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableContent = styled('tbody', {
  '& td': {
    '&:first-of-type': {
      textAlign: 'center',
      '& div': {
        margin: 'auto'
      }
    },
  }
});
