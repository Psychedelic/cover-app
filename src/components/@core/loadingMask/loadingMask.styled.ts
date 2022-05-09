import {defaultStitches} from '@/themes';
const {styled, keyframes} = defaultStitches;

const blink = keyframes({
  '0%': {opacity: 1},
  '50%': {opacity: 0.5},
  '100%': {opacity: 1}
});

export const StitchesLoadingMask = styled('div', {
  borderRadius: '$mask',
  background: '$coverGradientGray',
  animation: `${blink} 2s linear infinite;`,
  variants: {
    size: {
      dot: {
        width: '18px !important',
        height: '18px !important'
      },
      cell: {
        width: '90px !important',
        height: '18px !important'
      }
    }
  },
  defaultVariants: {
    size: 'cell'
  }
});
