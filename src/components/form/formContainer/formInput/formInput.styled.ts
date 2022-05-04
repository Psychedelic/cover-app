import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesFormInput = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  rowGap: '10px',
  '& *': {
    width: '100%'
  },
  '& label': {
    color: '$coverLightGray',
    fontSize: '$xs',
    fontWeight: '$normal'
  },
  '& textarea': {
    border: '1px solid $coverMediumGray',
    borderRadius: '$8',
    fontSize: '$sm',
    fontWeight: '$normal'
  },
  '& input': {
    border: '1px solid $coverMediumGray',
    borderRadius: '$8',
    padding: '0 $15',
    fontSize: '$sm',
    fontWeight: '$normal'
  },
  '& span': {
    fontSize: '$xs'
  },
  variants: {
    hasError: {
      true: {
        color: '$coverRed',
        '& textarea, input': {
          color: 'inherit',
          border: '1px solid $coverRed'
        }
      },
      false: {}
    }
  },
  defaultVariants: {
    hasError: 'true'
  }
});
