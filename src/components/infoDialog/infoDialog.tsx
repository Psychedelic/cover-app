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
            <Core.Dot size={'large'} type={'yellow'} />
            {title || ' Information'}
          </Core.AlertDialogTitle>
          <Core.AlertDialogDescription>{description || 'Info'}</Core.AlertDialogDescription>
          <StitchesBtnGroup>
            {showCancelBtn && (
              <Core.AlertDialogCancel asChild>
                <Core.Button onClick={onCancelClick} size={'large'} type={'outline'}>
                  {cancelContent}
                </Core.Button>
              </Core.AlertDialogCancel>
            )}
            {showActionBtn && (
              <Core.AlertDialogAction asChild>
                <Core.Button onClick={onActionClick} size={'large'} type={'main'}>
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
