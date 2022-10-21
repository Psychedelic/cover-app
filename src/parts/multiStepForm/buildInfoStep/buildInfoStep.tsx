import {FC, FormEvent, useCallback, useRef} from 'react';

import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {isFrom1To10, isValidHexFormat, isValidTimestamp, isValidVersionFormat} from '@/utils';

import {StitchesBuildInfoStep} from './buildInfoStep.styled';

interface PropTypes {
  defaultValue: BuildInfo | undefined;
  onCompleted: (input: BuildInfo) => void;
  onGoBack: (input: BuildInfo) => void;
}

export interface BuildInfo {
  rustVersion: string;
  dfxVersion: string;
  optimizeCount: string;
  timestamp: string;
  signature: string;
  publicKey: string;
}

export const BuildInfoStep: FC<PropTypes> = ({onCompleted, defaultValue, onGoBack}) => {
  const rustVersionRef = useRef<FormInputHandler>(null),
    dfxVersionRef = useRef<FormInputHandler>(null),
    optimizeCountRef = useRef<FormInputHandler>(null),
    timestampRef = useRef<FormInputHandler>(null),
    signatureRef = useRef<FormInputHandler>(null),
    publicKeyRef = useRef<FormInputHandler>(null);
  const onSubmit = useCallback(
    (event?: FormEvent) => {
      event?.preventDefault();
      const hasError = [
        rustVersionRef,
        dfxVersionRef,
        optimizeCountRef,
        timestampRef,
        signatureRef,
        publicKeyRef
      ].reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (hasError) return;
      onCompleted({
        rustVersion: rustVersionRef.current?.value() || '',
        dfxVersion: dfxVersionRef.current?.value() || '',
        optimizeCount: optimizeCountRef.current?.value() || '',
        timestamp: timestampRef.current?.value() || '',
        signature: signatureRef.current?.value() || '',
        publicKey: publicKeyRef.current?.value() || ''
      });
    },
    [onCompleted]
  );
  const goBackHandler = useCallback(() => {
    onGoBack({
      rustVersion: rustVersionRef.current?.value() || '',
      dfxVersion: dfxVersionRef.current?.value() || '',
      optimizeCount: optimizeCountRef.current?.value() || '',
      timestamp: timestampRef.current?.value() || '',
      signature: signatureRef.current?.value() || '',
      publicKey: publicKeyRef.current?.value() || ''
    });
  }, [onGoBack]);
  return (
    <StitchesBuildInfoStep>
      <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
        <div className={'header'}>
          <Core.Button kind={'text'} onClick={goBackHandler} type={'button'}>
            <Core.Icon icon={faChevronLeft} size={'lg'} />
          </Core.Button>
          <span>{'Submit Verification'}</span>
        </div>
        <FormInput
          defaultValue={defaultValue?.rustVersion}
          errorMessage={'Invalid version format. Example 1.60.0'}
          infoTooltip={'Rust stable version to build the canister; skip this field if using Motoko'}
          label={'Rust Version'}
          ref={rustVersionRef}
          validationIf={[value => parseInt(value, 10) > 0]}
          validations={[isValidVersionFormat]}
        />
        <FormInput
          defaultValue={defaultValue?.dfxVersion}
          errorMessage={'Invalid version format. Example 0.9.2'}
          infoTooltip={'Dfx version to deploy/build the canister'}
          label={'DFX Version'}
          ref={dfxVersionRef}
          required
          validations={[isValidVersionFormat]}
        />
        <FormInput
          defaultValue={defaultValue?.optimizeCount}
          errorMessage={'Invalid number. Only support positive number from 0-10'}
          infoTooltip={
            'The times you want to optimize your wasm. After the first time, ' +
            'the wasm will not be significantly smaller anymore. If times > 0, you must specify the rust version'
          }
          label={'IC CDK Optimizer'}
          ref={optimizeCountRef}
          required
          validations={[isFrom1To10]}
        />
        <FormInput
          defaultValue={defaultValue?.timestamp}
          errorMessage={'Invalid timestamp format. Example: 1651742769039'}
          infoTooltip={
            'The timestamp in UNIX epoch format is also a challenge to sign by your identity, ' +
            'and the signature will be expired after 5 minutes.'
          }
          label={'Timestamp'}
          ref={timestampRef}
          required
          validations={[isValidTimestamp]}
        />
        <FormInput
          defaultValue={defaultValue?.signature}
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The signature is signed with the timestamp being the message'}
          label={'Signature'}
          ref={signatureRef}
          required
          rows={3}
          textarea
          validations={[isValidHexFormat]}
        />
        <FormInput
          defaultValue={defaultValue?.publicKey}
          errorMessage={'Invalid hex format. Example: f01f'}
          infoTooltip={'The public key that associated with the owner principal ID'}
          label={'Public Key'}
          ref={publicKeyRef}
          required
          textarea
          validations={[isValidHexFormat]}
        />
        <div className={'formButtonGroup'}>
          <Link to={DASHBOARD_PATH}>
            <Core.Button kind={'outline'} size={'large'}>
              {'Cancel'}
            </Core.Button>
          </Link>
          <Core.Button size={'large'}>{'Submit Verification'}</Core.Button>
        </div>
      </FormContainer>
    </StitchesBuildInfoStep>
  );
};
