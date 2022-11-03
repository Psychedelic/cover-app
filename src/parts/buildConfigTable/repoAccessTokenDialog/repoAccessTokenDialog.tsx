import {forwardRef, useCallback, useImperativeHandle, useRef, useState} from 'react';

import {Core, FormInput, FormInputHandler} from '@/components';
import {BuildConfig} from '@/models';

import {formInputStyle, StitchesBtnGroup} from './repoAccessTokenDialog.styled';

interface PropTypes {
  onAction: (buildConfig: BuildConfig, repoAccessToken: string) => void;
}

export interface RepoAccessTokenDialogHandler {
  open: (buildConfig: BuildConfig) => void;
  close: () => void;
}

export const RepoAccessTokenDialog = forwardRef<RepoAccessTokenDialogHandler, PropTypes>(({onAction}, ref) => {
  const repoAccessTokenRef = useRef<FormInputHandler>(null);
  const buildConfigRef = useRef<BuildConfig>({});
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    open: (buildConfig: BuildConfig) => {
      setIsOpen(true);
      buildConfigRef.current = buildConfig;
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
    onAction(buildConfigRef.current, repoAccessTokenRef.current?.value() || '');
  }, [onAction]);

  return (
    <Core.AlertDialog open={isOpen}>
      <Core.AlertDialogContent>
        <Core.AlertDialogTitle>{'Repo Access Token Required'}</Core.AlertDialogTitle>
        <Core.AlertDialogDescription>
          {`We'll need your Repo Access Token to proceed with the submission, leave it empty if your repo is public.`}
        </Core.AlertDialogDescription>
        <FormInput css={formInputStyle} label={'Repo Access Token'} ref={repoAccessTokenRef} />
        <StitchesBtnGroup>
          <Core.AlertDialogCancel asChild>
            <Core.Button kind={'outline'} onClick={onCancelClick} size={'large'}>
              {'Cancel'}
            </Core.Button>
          </Core.AlertDialogCancel>
          <Core.AlertDialogAction asChild>
            <Core.Button kind={'main'} onClick={onActionClick} size={'large'}>
              {'Submit'}
            </Core.Button>
          </Core.AlertDialogAction>
        </StitchesBtnGroup>
      </Core.AlertDialogContent>
    </Core.AlertDialog>
  );
});
