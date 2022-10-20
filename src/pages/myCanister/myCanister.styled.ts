import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const ContentContainerOuter = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column'
});

export const Title = styled('div', {
  width: '1230px',
  padding: '$20 0',
  alignSelf: 'center',
  fontSize: '22px',
  color: '$coverWhite'
});

export const ContentContainer = styled('div', {
  display: 'inline-flex',
  columnGap: '$30',
  justifyContent: 'center'
});

export const LeftContent = styled('div', {});

export const RightContent = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  rowGap: '$30'
});
