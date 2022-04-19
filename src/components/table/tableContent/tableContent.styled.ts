import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesTableContent = styled('tr', {
  borderBottom: '1px solid $coverMediumGray',
  color: '$coverLightGray',
  fontSize: '$xs',
  fontWeight: '$normal',
  boxSizing: 'border-box',
  textAlign: 'left',
  height: '$32',
  '& td': {
    verticalAlign: 'middle',
    '&#statusDot': {
      textAlign: 'center',
      width: '40px'
    }
  }
});
