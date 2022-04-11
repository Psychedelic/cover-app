import {customStitches} from '@/themes';

const {styled} = customStitches;

export const Container = styled('div', {
  background: '$slate2',
  height: '100vh',
  width: '100%'
});

export const Title = styled('span', {
  fontWeight: '$bold',
  fontSize: '$md',
  color: '$purple7'
});
