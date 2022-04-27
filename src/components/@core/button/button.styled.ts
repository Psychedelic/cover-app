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
  '& a': {
    all: 'unset'
  },
  variants: {
    type: {
      main: {
        color: '$coverGreen',
        backgroundColor: '$coverDarkGreen',
        '&:hover': {
          color: '$coverGreenOpacity'
        },
        '&[disabled]': {
          cursor: 'default',
          color: '$coverGreenOpacity'
        }
      },
      outline: {
        border: '1px solid $coverGray',
        boxSizing: 'border-box',
        color: '$coverWhite',
        '&:hover': {
          color: '$coverWhiteOpacity'
        },
        '&[disabled]': {
          cursor: 'default',
          color: '$coverWhiteOpacity'
        }
      },
      text: {
        color: '$coverLightGray',
        '&:hover': {
          textDecorationLine: 'underline'
        },
        '&[disabled]': {
          cursor: 'default'
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
