import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesTableEmptyRow = styled('tr', {
  height: '384px !important',
  '&:hover': {
    background: 'inherit !important'
  }
});

export const StitchesTableEmptyCell = styled('td', {});

export const StitchesTableEmptyContent = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  rowGap: 20
});

export const StitchesTableEmptyMainText = styled('div', {
  fontSize: '10px',
  lineHeight: '18px',
  color: '#494949'
});
