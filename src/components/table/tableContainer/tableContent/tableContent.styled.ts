import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableContent = styled('tbody', {
  textAlign: 'left',
  '& td': {
    verticalAlign: 'middle',
    '&:first-of-type': {
      paddingLeft: '$15'
    },
    '&:last-of-type': {
      paddingRight: '$15'
    }
  }
});
