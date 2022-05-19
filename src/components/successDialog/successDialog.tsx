import React, {useCallback, useImperativeHandle, useState} from 'react';

import {Core} from '@/components';

import {StitchesBtnGroup} from './successDialog.styled';

interface PropTypes {
  cancelContent?: string;
  actionContent?: string;
  open?: boolean;
  onAction?: () => void;
}

export interface SuccessDialogHandler {
  open: (option?: {title?: string; description?: React.ReactNode; showActionBtn?: boolean}) => void;
  close: () => void;
}

export const SuccessDialog = React.forwardRef<SuccessDialogHandler, PropTypes>(
  ({cancelContent = 'Cancel', actionContent = 'Ok', open, onAction}, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    const [showActionBtn, setShowActionBtn] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<React.ReactNode>();
    useImperativeHandle(ref, () => ({
      open: (option = {title: '', description: '', showActionBtn: false}) => {
        setIsOpen(true);
        setTitle((option.title as string) && ` ${option.title}`);
        setDescription(option.description);
        setShowActionBtn(Boolean(option.showActionBtn));
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
            <Core.Dot size={'large'} type={'green'} />
            {title || ' Success'}
          </Core.AlertDialogTitle>
          <Core.AlertDialogDescription>{description || 'Congrats!'}</Core.AlertDialogDescription>
          <StitchesBtnGroup>
            <Core.AlertDialogCancel asChild>
              <Core.Button onClick={onCancelClick} size={'large'} type={'outline'}>
                {cancelContent}
              </Core.Button>
            </Core.AlertDialogCancel>
            {showActionBtn ? (
              <Core.AlertDialogAction asChild>
                <Core.Button onClick={onActionClick} size={'large'} type={'main'}>
                  {actionContent}
                </Core.Button>
              </Core.AlertDialogAction>
            ) : null}
          </StitchesBtnGroup>
        </Core.AlertDialogContent>
      </Core.AlertDialog>
    );
  }
);
