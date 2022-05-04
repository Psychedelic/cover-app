import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesFormContainer = styled('form', {
  display: 'inline-flex',
  flexDirection: 'column',
  backgroundColor: '$coverHeavyGray',
  borderRadius: '16px',
  width: '560px',
  padding: '$25',
  rowGap: '25px'
});
