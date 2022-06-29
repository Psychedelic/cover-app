import * as SwitchPrimitive from '@radix-ui/react-switch';

import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesSwitch = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 50,
  height: 25,
  borderRadius: '9999px',
  position: 'relative',
  backgroundColor: '$coverRed',
  '&[data-state="checked"]': {backgroundColor: '$coverGreenOpacity'}
});

export const StitchesThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: 'white',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': {transform: 'translateX(28px)'}
});
