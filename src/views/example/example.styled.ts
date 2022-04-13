import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const Container = styled('div', {
  background: '$slate12',
  height: '100vh',
  width: '100%'
});

export const Title = styled('span', {
  fontWeight: '$bold',
  fontSize: '$md',
  color: '$purple7'
});
