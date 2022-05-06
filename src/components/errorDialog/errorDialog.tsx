import React, {useCallback, useImperativeHandle, useState} from 'react';

import {Core} from '@/components';

import {StitchesBtnGroup} from './errorDialog.styled';

interface PropTypes {
  actionContent?: string;
  open?: boolean;
  onAction?: React.ReactEventHandler;
}

export interface ErrorDialogHandler {
  open: () => void;
}

export const ErrorDialog = React.forwardRef<ErrorDialogHandler, PropTypes>(
  ({actionContent = 'Retry', open, onAction}, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    useImperativeHandle(ref, () => ({
      open: () => {
        setIsOpen(true);
      }
    }));
    const onCancelClick = useCallback(() => {
      setIsOpen(false);
    }, []);
    return (
      <Core.AlertDialog open={isOpen}>
        <Core.AlertDialogContent>
          <Core.AlertDialogTitle>
            <Core.Dot size={'large'} type={'red'} />
            {' We ran into an issue'}
          </Core.AlertDialogTitle>
          <Core.AlertDialogDescription>
            {'Please retry the submission, if this issue persists report in our'}{' '}
            <a href={'https://discord.gg/yVEcEzmrgm'} rel={'noreferrer'} target={'_blank'}>
              {'Discord'}
            </a>
            {'.'}
          </Core.AlertDialogDescription>
          <StitchesBtnGroup>
            <Core.AlertDialogCancel asChild>
              <Core.Button onClick={onCancelClick} size={'large'} type={'outline'}>
                {'Cancel'}
              </Core.Button>
            </Core.AlertDialogCancel>
            <Core.AlertDialogAction asChild>
              <Core.Button onClick={onAction} size={'large'} type={'main'}>
                {actionContent}
              </Core.Button>
            </Core.AlertDialogAction>
          </StitchesBtnGroup>
        </Core.AlertDialogContent>
      </Core.AlertDialog>
    );
  }
);
