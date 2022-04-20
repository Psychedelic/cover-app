import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableContainer = styled('div', {
  border: '1px solid $coverMediumGray',
  borderRadius: '$8',
  '& table': {
    width: '100%',
    tableLayout: 'fixed',
    '& thead': {
      borderBottom: '1px solid $coverMediumGray'
    }
  },
  color: '$coverLightGray',
  fontSize: '$xs',
  fontWeight: '$normal'
});