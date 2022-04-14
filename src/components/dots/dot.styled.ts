import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesDot = styled('span', {
  width: '$dot',
  height: '$dot',
  borderRadius: '$dot',
  display: 'inline-block',
  variants: {
    status: {
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
