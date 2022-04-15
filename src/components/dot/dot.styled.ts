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
        backgroundColor: '$coverGreen'
      },
      red: {
        backgroundColor: '$coverRed'
      },
      yellow: {
        backgroundColor: '$coverYellow'
      }
    }
  }
});
