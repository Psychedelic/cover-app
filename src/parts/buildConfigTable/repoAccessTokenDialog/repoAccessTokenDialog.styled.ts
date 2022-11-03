import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const formInputStyle = {
  display: 'flex',
  padding: '0 0 $25 0'
};

export const StitchesBtnGroup = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  columnGap: '$20',
  '> button': {
    padding: '0 $25'
  }
});
