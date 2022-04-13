import {defaultStitches, typography} from '@/themes';
const {styled} = defaultStitches;

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 15px',
  borderRadius: 8,
  lineHeight: 12,
  fontWeight: typography.fontWeights.normal,
  fontSize: typography.fontSizes.xs,
  fontFamily: typography.fonts.monaco,
  fontStyle: 'normal',
  variants: {
    type: {
      main: {
        color: '#03BF00',
        backgroundColor: '#013200'
      },
      secondary: {
        border: '1px solid #434343',
        boxSizing: 'border-box',
        color: '#FFFFFF'
      }
    },
    size: {
      large: {
        height: 44
      },
      medium: {
        height: 34
      }
    }
  }
});
