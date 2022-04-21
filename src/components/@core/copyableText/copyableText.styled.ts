import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesCopyableText = styled('span', {
  color: '$coverLightWhite',
  fontWeight: '$normal',
  fontSize: '$xs',
  userSelect: 'none',
  '&:hover': {
    color: '$coverBlue',
    cursor: 'pointer'
  },
  variants: {
    color: {
      gray: {
        color: '$coverLightGray'
      },
      white: {
        color: '$coverLightWhite'
      }
    }
  },
  defaultVariants: {
    color: 'white'
  }
});
