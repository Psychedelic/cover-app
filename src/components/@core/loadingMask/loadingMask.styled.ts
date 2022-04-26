import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesLoadingMask = styled('div', {
  borderRadius: '$mask',
  background: '$coverGradientGray',
  variants: {
    size: {
      dot: {
        width: '18px',
        height: '18px'
      },
      cell: {
        width: '90px',
        height: '18px'
      }
    }
  },
  defaultVariants: {
    size: 'cell'
  }
});
