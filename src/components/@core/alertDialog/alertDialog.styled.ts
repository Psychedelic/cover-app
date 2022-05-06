import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import {defaultStitches} from '@/themes';
const {styled, keyframes} = defaultStitches;

const overlayShow = keyframes({
  '0%': {opacity: 0},
  '100%': {opacity: 1}
});

const contentShow = keyframes({
  '0%': {opacity: 0, transform: 'translate(-50%, -48%) scale(.96)'},
  '100%': {opacity: 1, transform: 'translate(-50%, -50%) scale(1)'}
});

export const StitchesOverlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: '$coverBackgroundOverlay',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
  }
});

export const StitchesContent = styled(AlertDialogPrimitive.Content, {
  backgroundColor: '$coverHeavyGray',
  borderRadius: 16,
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: '$30 $25',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`
  },
  '&:focus': {outline: 'none'}
});

export const StitchesTitle = styled(AlertDialogPrimitive.Title, {
  margin: 0,
  marginBottom: '$15',
  color: '$coverWhite',
  fontSize: 22,
  fontWeight: 400,
  lineHeight: '23px'
});

export const StitchesDescription = styled(AlertDialogPrimitive.Description, {
  marginBottom: '$25',
  color: '$coverLightGray',
  fontSize: '$sm',
  fontWeight: 400,
  lineHeight: '22px',
  '& a': {
    textDecoration: 'underline'
  }
});
