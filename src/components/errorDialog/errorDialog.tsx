import React, {useCallback, useImperativeHandle, useState} from 'react';

import {Core} from '@/components';

import {StitchesBtnGroup} from './errorDialog.styled';

interface PropTypes {
  cancelContent?: string;
  actionContent?: string;
  open?: boolean;
  onAction?: () => void;
}

export interface ErrorDialogHandler {
  open: (option?: {title?: string; description?: React.ReactNode; showActionBtn?: boolean}) => void;
  close: () => void;
}

export const ErrorDialog = React.forwardRef<ErrorDialogHandler, PropTypes>(
  ({cancelContent = 'Cancel', actionContent = 'Retry', open, onAction}, ref) => {
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
            <Core.Dot kind={'red'} size={'large'} />
            {title || ' We ran into an issue'}
          </Core.AlertDialogTitle>
          <Core.AlertDialogDescription>
            {description || (
              <>
                {'Please retry the submission, if this issue persists report in our '}
                <a href={'https://discord.gg/yVEcEzmrgm'} rel={'noreferrer'} target={'_blank'}>
                  {'Discord'}
                </a>
                {'.'}
              </>
            )}
          </Core.AlertDialogDescription>
          <StitchesBtnGroup>
            <Core.AlertDialogCancel asChild>
              <Core.Button kind={'outline'} onClick={onCancelClick} size={'large'}>
                {cancelContent}
              </Core.Button>
            </Core.AlertDialogCancel>
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
