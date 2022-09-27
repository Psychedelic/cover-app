import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const StitchesAutoSubmitForm = styled('div', {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'center',
  '& .header': {
    display: 'inline-flex',
    alignItems: 'center',
    height: '34px',
    color: '$coverWhite',
    fontSize: '22px',
    margin: '0 0 $10 0',
    '& button': {
      margin: 0,
      padding: '0 15px 0 0',
      color: '$coverWhite'
    }
  },
  '& .info': {
    display: 'inline-flex',
    background: '#2B2B2B',
    fontSize: '$xs',
    padding: 10,
    borderRadius: '$8',
    columnGap: 5,
    '> svg': {
      margin: 2,
      color: '#747474',
    },
    '> span': {
      lineHeight: '18px',
      color: '#AAAAAA',
      '> a': {
        textDecoration: 'underline'
      }
    }
  },
  '& button': {
    marginLeft: '13px'
  },
  '& .formButtonGroup': {
    display: 'flex',
    justifyContent: 'flex-end',
    '> button': {
      width: '200px'
    }
  }
});
