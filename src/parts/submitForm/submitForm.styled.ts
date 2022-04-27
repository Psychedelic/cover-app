import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesSubmitForm = styled('div', {
  '& h3': {
    color: '$coverWhite',
    fontSize: '22px'
  },
  '& button:nth-of-type(2)': {
    marginLeft: '13px'
  },
  '& .buttonGroup': {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '25px'
  }
});
