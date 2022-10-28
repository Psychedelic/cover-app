import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableEmptyRow = styled('tr', {
  height: '636px !important',
  '&:hover': {
    background: 'inherit !important'
  }
});

export const StitchesTableEmptyCell = styled('td', {
  opacity: '1 !important'
});

export const StitchesTableEmptyContent = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 20,
  '& button': {
    width: '189px !important',
    height: '34px !important'
  }
});

export const StitchesTableEmptyMainText = styled('div', {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#555555'
});

export const StitchesTableEmptySecondText = styled('span', {
  fontSize: '10px',
  lineHeight: '18px',
  color: '#494949'
});
