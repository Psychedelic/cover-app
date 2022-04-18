import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesInputContent = styled('input', {
  all: 'unset',
  '&:placeholder': {
    color: 'inherit'
  },
  color: '$coverMediumWhite',
  variants: {
    size: {
      small: {
        height: '$28',
        fontSize: '$xs',
        width: '$400'
      },
      medium: {
        height: '$44',
        fontSize: '$sm',
        width: '$560'
      }
    }
  },
  defaultVariants: {
    size: 'medium'
  }
});
