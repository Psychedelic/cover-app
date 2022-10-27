import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesBtnGroup = styled('div', {
  display: 'flex',
  columnGap: '$20'
});

export const deleteBtnStyle = {
  background: '#4C101B',
  color: '#ED3357',
  '&:hover': {
    color: '#ED3357',
    opacity: 0.5
  }
};
