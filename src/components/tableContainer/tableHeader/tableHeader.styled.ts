import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesTableHeader = styled('tr', {
  borderBottom: '1px solid $coverMediumGray',
  color: '$coverLightGray',
  fontSize: '$sm',
  fontWeight: '$normal',
  boxSizing: 'border-box',
  textAlign: 'left',
  height: '$32',
  '& th': {
    verticalAlign: 'middle',
    '&#statusDotHeader': {
      textAlign: 'center',
      width: '$40'
    }
  }
});
