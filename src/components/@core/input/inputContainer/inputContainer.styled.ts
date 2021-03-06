import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesInputContainer = styled('div', {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '$8',
  padding: '$0 $12',
  boxSizing: 'border-box',
  border: '1px solid $coverMediumGray',
  fontWeight: '$normal',
  fontFamily: '$monaco',
  color: '$coverLightGray',
  background: 'inherit',
  '& svg': {
    marginRight: '$10'
  },
  variants: {
    bg: {
      gray: {
        background: '$coverDarkGray'
      }
    },
    size: {
      small: {
        width: '$400'
      },
      medium: {
        width: '$560'
      }
    }
  },
  defaultVariants: {
    size: 'medium'
  }
});
