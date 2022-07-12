import {defaultStitches} from '@/themes';

const {styled} = defaultStitches;

export const containerStyle = {
  height: 'calc(100vh - 60px)'
};

export const ContentContainer = styled('div', {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    width: '160px'
  },
  p: {
    color: '$coverLightWhite',
    fontSize: '$xs',
    width: '$240',
    textAlign: 'center',
    margin: '$20 0'
  }
});
