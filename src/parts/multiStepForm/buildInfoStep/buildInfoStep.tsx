import React, {useCallback, useRef} from 'react';

import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput, FormInputHandler} from '@/components';
import {DASHBOARD_PATH} from '@/constants';
import {isFrom1To10, isValidHexFormat, isValidTimestamp, isValidVersionFormat} from '@/utils';

interface PropTypes {
  defaultValue: BuildInfo | null;
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

interface InputRefs {
  rustVersion: React.RefObject<FormInputHandler>;
  dfxVersion: React.RefObject<FormInputHandler>;
  optimizeCount: React.RefObject<FormInputHandler>;
  timestamp: React.RefObject<FormInputHandler>;
  signature: React.RefObject<FormInputHandler>;
  publicKey: React.RefObject<FormInputHandler>;
}

const useInputRefs = (): InputRefs => ({
  rustVersion: useRef<FormInputHandler>(null),
  dfxVersion: useRef<FormInputHandler>(null),
  optimizeCount: useRef<FormInputHandler>(null),
  timestamp: useRef<FormInputHandler>(null),
  signature: useRef<FormInputHandler>(null),
  publicKey: useRef<FormInputHandler>(null)
});

const getData = (inputRefs: InputRefs) => ({
  rustVersion: inputRefs.rustVersion.current?.value() || '',
  dfxVersion: inputRefs.dfxVersion.current?.value() || '',
  optimizeCount: inputRefs.optimizeCount.current?.value() || '',
  timestamp: inputRefs.timestamp.current?.value() || '',
  signature: inputRefs.signature.current?.value() || '',
  publicKey: inputRefs.publicKey.current?.value() || ''
});

export const BuildInfoStep: React.FC<PropTypes> = ({onCompleted, defaultValue, onGoBack}) => {
  const inputRefs = useInputRefs();
  const onSubmit = useCallback(
    (event?: React.FormEvent) => {
      event?.preventDefault();
      const hasError = Object.values(inputRefs).reduce((result, ref) => {
        if (ref.current) {
          return ref.current.hasError() || result;
        }
        return result;
      }, false);
      if (hasError) return;
      onCompleted(getData(inputRefs));
    },
    [onCompleted, inputRefs]
  );
  const goBackHandler = useCallback(() => {
    onGoBack(getData(inputRefs));
  }, [inputRefs, onGoBack]);
  return (
    <FormContainer autoComplete={'off'} onSubmit={onSubmit}>
      <div className={'header'}>
        <Core.Button onClick={goBackHandler} type={'text'}>
          <FontAwesomeIcon icon={faChevronLeft} size={'lg'} />
        </Core.Button>
        <span>{'Submit Verification'}</span>
      </div>
      <FormInput
        defaultValue={defaultValue?.rustVersion}
        errorMessage={'Invalid version format. Example 1.60.0'}
        infoTooltip={'Rust stable version to build the canister; skip this field if using Motoko'}
        label={'Rust Version'}
        ref={inputRefs.rustVersion}
        validationIf={[value => parseInt(value, 10) > 0]}
        validations={[isValidVersionFormat]}
      />
      <FormInput
        defaultValue={defaultValue?.dfxVersion}
        errorMessage={'Invalid version format. Example 0.9.2'}
        infoTooltip={'Dfx version to deploy/build the canister'}
        label={'DFX Version'}
        ref={inputRefs.dfxVersion}
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
        ref={inputRefs.optimizeCount}
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
        ref={inputRefs.timestamp}
        required
        validations={[isValidTimestamp]}
      />
      <FormInput
        defaultValue={defaultValue?.signature}
        errorMessage={'Invalid hex format. Example: f01f'}
        infoTooltip={'The signature is signed with the timestamp being the message'}
        label={'Signature'}
        ref={inputRefs.signature}
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
        ref={inputRefs.publicKey}
        required
        textarea
        validations={[isValidHexFormat]}
      />
      <div className={'formButtonGroup'}>
        <Link to={DASHBOARD_PATH}>
          <Core.Button size={'large'} type={'outline'}>
            {'Cancel'}
          </Core.Button>
        </Link>
        <Core.Button size={'large'}>{'Submit Verification'}</Core.Button>
      </div>
    </FormContainer>
  );
};
