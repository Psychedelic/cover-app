import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const menuStyle = {
  padding: '0 8px'
};

export const StitchesMenuItem = styled('div', {
  display: 'flex',
  padding: '10px 0'
});

export const StitchesMenuIcon = styled('div', {
  color: '$coverSocialIconGray',
  width: 14
});

export const StitchesMenuText = styled('div', {
  marginLeft: 20,
  '&:hover': {
    opacity: 0.3
  }
});
