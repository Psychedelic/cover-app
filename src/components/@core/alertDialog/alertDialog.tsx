import React from 'react';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import {StitchesContent, StitchesDescription, StitchesOverlay, StitchesTitle} from './alertDialog.styled';

const Content: React.FC<React.PropsWithChildren<unknown>> = ({children}) => (
  <AlertDialogPrimitive.Portal>
    <StitchesOverlay />
    <StitchesContent>{children}</StitchesContent>
  </AlertDialogPrimitive.Portal>
);

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
export const AlertDialogContent = Content;
export const AlertDialogTitle = StitchesTitle;
export const AlertDialogDescription = StitchesDescription;
export const AlertDialogAction = AlertDialogPrimitive.Action;
export const AlertDialogCancel = AlertDialogPrimitive.Cancel;
