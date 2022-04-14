import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesButton = styled('button', {
  all: 'unset',
  padding: '$0 $15',
  borderRadius: '$8',
  fontWeight: '$normal',
  fontSize: '$xs',
  fontFamily: '$monaco',
  variants: {
    type: {
      main: {
        color: '$coverGreen',
        backgroundColor: '$coverGreenDark'
      },
      secondary: {
        border: '1px solid $coverLightGray',
        boxSizing: 'border-box',
        color: '$coverWhite'
      }
    },
    size: {
      large: {
        height: '$btnLg'
      },
      medium: {
        height: '$btnMd'
      }
    }
  },
  defaultVariants: {
    type: 'main',
    size: 'medium'
  }
});
