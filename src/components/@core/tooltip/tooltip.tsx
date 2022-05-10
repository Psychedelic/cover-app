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

const StyledContent = styled(TooltipPrimitive.Content, {
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

const StyledArrow = styled(TooltipPrimitive.Arrow, {
  fill: '$coverDarkGray'
});

const StyleTrigger = styled(TooltipPrimitive.Trigger, {
  all: 'unset',
  color: '$coverLightGray',
  '&:hover': {
    color: '$coverLightWhite'
  }
});

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipRoot = TooltipPrimitive.Root;
export const TooltipTrigger = StyleTrigger;
export const TooltipContent = StyledContent;
export const TooltipArrow = StyledArrow;
