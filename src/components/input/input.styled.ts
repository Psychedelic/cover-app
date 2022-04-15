import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesInput = styled('input', {
  borderRadius: '$8',
  boxSizing: 'border-box',
  border: '1px solid $coverMediumGray',
  height: '$44',
  color: '$coverMediumWhite',
  background: 'inherit',
  padding: '$14 $12',
  fontSize: '$sm',
  fontWeight: '$normal',
  fontFamily: '$monaco'
});
