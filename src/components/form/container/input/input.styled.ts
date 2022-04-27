import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesFormInput = styled('div', {
  marginTop: '25px',
  '& label': {
    color: '$coverLightGray',
    fontSize: '$xs'
  },
  '& textarea': {
    marginTop: '$5'
  },
  '& input': {
    border: '1px solid $coverMediumGray',
    borderRadius: '$8',
    marginTop: '$5',
    padding: '0 $15'
  }
});
