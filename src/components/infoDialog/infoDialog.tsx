import React, {useCallback, useImperativeHandle, useState} from 'react';

import {Core} from '@/components';

import {StitchesBtnGroup} from './infoDialog.styled';

interface PropTypes {
  cancelContent?: string;
  actionContent?: string;
  open?: boolean;
  onAction?: () => void;
}

export interface InfoDialogHandler {
  open: (option?: {
    title?: string;
    description?: React.ReactNode;
    showActionBtn?: boolean;
    showCancelBtn?: boolean;
  }) => void;
  close: () => void;
}

export const InfoDialog = React.forwardRef<InfoDialogHandler, PropTypes>(
  ({cancelContent = 'Cancel', actionContent = 'Ok', open, onAction}, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    const [showActionBtn, setShowActionBtn] = useState(false);
    const [showCancelBtn, setShowCancelBtn] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<React.ReactNode>();
    useImperativeHandle(ref, () => ({
      open: (option = {title: '', description: '', showActionBtn: false}) => {
        setIsOpen(true);
        setTitle((option.title as string) && ` ${option.title}`);
        setDescription(option.description);
        setShowActionBtn(Boolean(option.showActionBtn));
        setShowCancelBtn(Boolean(option.showCancelBtn));
      },
      close: () => {
        setIsOpen(false);
      }
    }));
    const onCancelClick = useCallback(() => {
      setIsOpen(false);
    }, []);
    const onActionClick = useCallback(() => {
      setIsOpen(false);
      onAction && onAction();
    }, [onAction]);
    return (
      <Core.AlertDialog open={isOpen}>
        <Core.AlertDialogContent>
          <Core.AlertDialogTitle>
            <Core.Dot kind={'yellow'} size={'large'} />
            {title || ' Information'}
          </Core.AlertDialogTitle>
          <Core.AlertDialogDescription>{description || 'Info'}</Core.AlertDialogDescription>
          <StitchesBtnGroup>
            {showCancelBtn && (
              <Core.AlertDialogCancel asChild>
                <Core.Button kind={'outline'} onClick={onCancelClick} size={'large'}>
                  {cancelContent}
                </Core.Button>
              </Core.AlertDialogCancel>
            )}
            {showActionBtn && (
              <Core.AlertDialogAction asChild>
                <Core.Button kind={'main'} onClick={onActionClick} size={'large'}>
                  {actionContent}
                </Core.Button>
              </Core.AlertDialogAction>
            )}
          </StitchesBtnGroup>
        </Core.AlertDialogContent>
      </Core.AlertDialog>
    );
  }
);
