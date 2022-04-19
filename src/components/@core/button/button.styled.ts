import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesButton = styled('button', {
  all: 'unset',
  padding: '$0 $15',
  borderRadius: '$8',
  fontWeight: '$normal',
  fontSize: '$xs',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  variants: {
    type: {
      main: {
        color: '$coverGreen',
        backgroundColor: '$coverGreenDark',
        '&:hover': {
          color: '$coverGreenOpacity'
        }
      },
      secondary: {
        border: '1px solid $coverGray',
        boxSizing: 'border-box',
        color: '$coverWhite',
        '&:hover': {
          color: '$coverWhiteOpacity'
        }
      },
      hollow: {
        color: '$coverLightGray',
        '&:hover': {
          textDecorationLine: 'underline'
        }
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
