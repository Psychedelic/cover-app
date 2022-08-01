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
  width: '600px'
});

export const StitchesPageSecondaryHeader = styled('div', {
  display: 'inline-flex',
  justifyContent: 'flex-end',
  width: '600px',
  '& button': {
    marginLeft: '10px'
  }
});

export const feedbackBtnCss = {
  padding: 0
};
