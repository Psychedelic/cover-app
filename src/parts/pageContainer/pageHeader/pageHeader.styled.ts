import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesPageHeaderContainer = styled('header', {
  display: 'inline-flex',
  justifyContent: 'center',
  columnGap: '$30',
  width: '100%',
  '& div:first-child a:first-child': {
    display: 'contents'
  }
});

export const StitchesPageMainHeader = styled('div', {
  display: 'inline-flex',
  rowGap: '$10',
  columnGap: '$15',
  width: '800px'
});

export const StitchesPageSecondaryHeader = styled('div', {
  display: 'inline-flex',
  justifyContent: 'flex-end',
  width: '400px',
  '& button': {
    marginLeft: '10px'
  }
});

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
