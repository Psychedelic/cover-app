import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesSubmitForm = styled('div', {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'center',
  '& h3': {
    color: '$coverWhite',
    fontSize: '22px',
    margin: '$0'
  },
  '& button': {
    marginLeft: '13px'
  },
  '& .formButtonGroup': {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '25px'
  }
});
