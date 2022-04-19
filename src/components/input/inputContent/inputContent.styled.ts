import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesInputContent = styled('input', {
  all: 'unset',
  '&:placeholder': {
    color: 'inherit'
  },
  color: '$coverMediumWhite',
  width: '100%',
  variants: {
    size: {
      small: {
        height: '$28',
        fontSize: '$xs'
      },
      medium: {
        height: '$44',
        fontSize: '$sm'
      }
    }
  },
  defaultVariants: {
    size: 'medium'
  }
});
