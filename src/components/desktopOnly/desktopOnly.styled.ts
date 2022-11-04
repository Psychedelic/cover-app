import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesOuterContainer = styled('div', {
  background: '#000000'
});

export const StitchesContainer = styled('div', {
  height: 'calc(100% - 60px)',
  padding: '$30'
});

export const StitchesInnerContainer = styled('div', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export const StitchesDescription = styled('div', {
  zIndex: 9999,
  textAlign: 'center',
  ':nth-of-type(1)': {
    color: '$coverWhite',
    fontSize: '28px',
    lineHeight: '29px'
  },
  ':nth-of-type(2)': {
    color: '#7A7A7A',
    fontSize: '16px',
    lineHeight: '22px'
  }
});

export const StitchesMedia = styled('div', {
  zIndex: 9999,
  color: '$coverWhite',
  '& a': {
    margin: '0 4px'
  },
  '& button': {
    height: '$40',
    width: '$40',
    padding: '$10',
    border: '1px solid #028400'
  }
});

export const StitchesTopRightImg = styled('img', {
  position: 'fixed',
  right: 0
});

export const StitchesLogoImg = styled('img', {
  height: 50,
  zIndex: 9999
});

export const StitchesBottomLeftImg = styled('img', {
  position: 'fixed',
  bottom: 0
});
