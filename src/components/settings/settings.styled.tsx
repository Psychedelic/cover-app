import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesSettingsRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '10px 0'
});

export const StitchesSettingsLeft = styled('div', {
  flex: 2
});

export const StitchesSettingsRight = styled('div', {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  '& div input': {
    width: 50,
    border: 'solid 2px black'
  },
  '> span': {
    marginLeft: 5
  }
});
