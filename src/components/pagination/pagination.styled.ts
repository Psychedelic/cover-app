import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesPagination = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  margin: '$14 $0',
  '& button': {
    fontSize: '$xs',
    height: '$28',
    width: '$28',
    backgroundColor: '$coverDarkGray',
    border: '1px solid $coverMediumGray'
  },
  '& input': {
    all: 'unset',
    color: '$coverLightWhite',
    height: '$26',
    width: '$30',
    fontSize: '$xs',
    backgroundColor: '$coverDarkGray',
    border: '1px solid $coverMediumGray',
    borderRadius: '$8',
    padding: '$0 $10',
    textAlign: 'center',
    margin: '$0 $5'
  }
});
