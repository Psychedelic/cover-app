import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesTableHeader = styled('tr', {
  borderBottom: '1px solid $coverMediumGray',
  color: '$coverLightGray',
  fontSize: '12px',
  fontWeight: '400',
  boxSizing: 'border-box',
  textAlign: 'left',
  height: '32px',
  '& th': {
    verticalAlign: 'middle',
    '&#statusDot': {
      textAlign: 'center',
      padding: '0 13px'
    }
  }
});
