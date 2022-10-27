import {forwardRef, ReactNode, useCallback, useImperativeHandle, useState} from 'react';

import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {deleteBtnStyle, StitchesBtnGroup} from './confirmDialog.styled';

interface PropTypes {
  cancelContent?: string;
  actionContent?: string;
  open?: boolean;
  onAction?: () => void;
}

export interface ConfirmDialogHandler {
  open: (option: {title?: string; description?: ReactNode}) => void;
  close: () => void;
}

export const ConfirmDialog = forwardRef<ConfirmDialogHandler, PropTypes>(
  ({cancelContent = 'Cancel', actionContent = 'Confirm', open, onAction}, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState<ReactNode>();
    useImperativeHandle(ref, () => ({
      open: option => {
        setIsOpen(true);
        setTitle((option.title as string) && ` ${option.title}`);
        setDescription(option.description);
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
            <FontAwesomeIcon color={'#656565'} icon={faTrash} />
            {title || ' Confirm'}
          </Core.AlertDialogTitle>
          <Core.AlertDialogDescription>{description || 'Description'}</Core.AlertDialogDescription>
          <StitchesBtnGroup>
            <Core.AlertDialogCancel asChild>
              <Core.Button kind={'outline'} onClick={onCancelClick} size={'large'}>
                {cancelContent}
              </Core.Button>
            </Core.AlertDialogCancel>
            <Core.AlertDialogAction asChild>
              <Core.Button css={deleteBtnStyle} kind={'main'} onClick={onActionClick} size={'large'}>
                {actionContent}
              </Core.Button>
            </Core.AlertDialogAction>
          </StitchesBtnGroup>
        </Core.AlertDialogContent>
      </Core.AlertDialog>
    );
  }
);
