import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTextarea = styled('textarea', {
  all: 'unset',
  width: '100%',
  border: '1px solid $coverMediumGray',
  borderRadius: '$8',
  resize: 'none',
  boxSizing: 'border-box',
  background: 'transparent',
  color: '$coverMediumWhite',
  lineHeight: '$20',
  fontSize: '$sm',
  fontWeight: '$normal'
});
