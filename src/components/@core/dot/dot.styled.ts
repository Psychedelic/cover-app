import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesDot = styled('span', {
  width: '$dot',
  height: '$dot',
  borderRadius: '$dot',
  display: 'inline-block',
  variants: {
    type: {
      hollow: {
        border: '1px solid $coverLightGray'
      },
      green: {
        border: '1px solid $coverGreen',
        backgroundColor: '$coverGreen'
      },
      red: {
        border: '1px solid $coverRed',
        backgroundColor: '$coverRed'
      },
      yellow: {
        border: '1px solid $coverYellow',
        backgroundColor: '$coverYellow'
      }
    }
  }
});
