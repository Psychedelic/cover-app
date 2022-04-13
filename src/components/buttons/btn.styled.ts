import {defaultStitches, typography} from '@/themes';
const {styled} = defaultStitches;

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  padding: '0 15px',
  lineHeight: 12,
  fontWeight: typography.fontWeights.normal,
  fontSize: typography.fontSizes.xs,
  fontFamily: typography.fonts.monaco,
  fontStyle: 'normal',
  height: 34,
  width: 134,
  color: '#03BF00',
  backgroundColor: '#013200;'
});
