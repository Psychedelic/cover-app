import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesLoadingMask = styled('div', {
  borderRadius: '$mask',
  background: '$coverGradientGray',
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
