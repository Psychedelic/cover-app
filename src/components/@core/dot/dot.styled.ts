import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesDot = styled('span', {
  borderRadius: '$dot',
  display: 'inline-block',
  variants: {
    kind: {
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
      },
      gray: {
        border: '1px solid $coverGrayIcon',
        backgroundColor: '$coverGrayIcon'
      }
    },
    size: {
      normal: {
        width: '$dot',
        height: '$dot'
      },
      large: {
        width: '17px',
        height: '17px'
      }
    }
  },
  defaultVariants: {
    size: 'normal'
  }
});
