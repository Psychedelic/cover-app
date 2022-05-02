import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableContent = styled('tbody', {
  '& tr:hover': {
    background: '$coverSuperLightGray'
  },
  '& td': {
    '&:first-of-type': {
      textAlign: 'center',
      '& div': {
        margin: 'auto'
      }
    }
  }
});
