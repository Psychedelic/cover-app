import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableHeader = styled('thead', {
  textAlign: 'left',
  '& tr': {
    height: '$32'
  },
  '& th': {
    verticalAlign: 'middle',
    '&:first-of-type': {
      width: '$25',
      paddingLeft: '$15'
    },
    '&:last-of-type': {
      paddingRight: '$15'
    }
  }
});
