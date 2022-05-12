import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import {defaultStitches} from '@/themes';
const {styled, keyframes} = defaultStitches;

const slideUpAndFade = keyframes({
  '0%': {opacity: 0, transform: 'translateY(2px)'},
  '100%': {opacity: 1, transform: 'translateY(0)'}
});

const slideRightAndFade = keyframes({
  '0%': {opacity: 0, transform: 'translateX(-2px)'},
  '100%': {opacity: 1, transform: 'translateX(0)'}
});

const slideDownAndFade = keyframes({
  '0%': {opacity: 0, transform: 'translateY(-2px)'},
  '100%': {opacity: 1, transform: 'translateY(0)'}
});

const slideLeftAndFade = keyframes({
  '0%': {opacity: 0, transform: 'translateX(2px)'},
  '100%': {opacity: 1, transform: 'translateX(0)'}
});

export const StitchesContent = styled(TooltipPrimitive.Content, {
  width: 260,
  borderRadius: 8,
  padding: '$15',
  color: '$coverLightWhite',
  fontSize: '$xs',
  backgroundColor: '$coverDarkGray',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '000ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    animationFillMode: 'forwards',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': {animationName: slideDownAndFade},
      '&[data-side="right"]': {animationName: slideLeftAndFade},
      '&[data-side="bottom"]': {animationName: slideUpAndFade},
      '&[data-side="left"]': {animationName: slideRightAndFade}
    }
  }
});

export const StitchesArrow = styled(TooltipPrimitive.Arrow, {
  fill: '$coverDarkGray'
});

export const StitchesTrigger = styled(TooltipPrimitive.Trigger, {
  all: 'unset',
  color: '$coverLightGray',
  '&:hover': {
    color: '$coverLightWhite'
  }
});
