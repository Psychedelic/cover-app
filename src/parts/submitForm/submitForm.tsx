import React from 'react';

import {CSS} from '@stitches/react';
import {Link} from 'react-router-dom';

import {Core, FormContainer, FormInput} from '@/components';
import {DASHBOARD_PATH} from '@/constants';

import {StitchesSubmitForm} from './submitForm.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesSubmitForm> {
  css?: CSS;
}

export const SubmitForm: React.FC<PropTypes> = ({css}) => (
  <StitchesSubmitForm css={css}>
    <FormContainer>
      <h3>{'Submit Verification'}</h3>
      <FormInput label={'User Principal ID'} />
      <FormInput label={'Canister Principal ID'} />
      <FormInput label={'Canister Name'} />
      <FormInput label={'Github Repo'} />
      <FormInput label={'Git Commit Hash'} />
      <FormInput label={'User Access Token'} />
      <FormInput label={'Rust Version'} />
      <FormInput label={'DFX Version'} />
      <FormInput label={'IC CDK Optimizer Needed'} />
      <FormInput label={'Signature'} rows={3} textarea />
      <FormInput label={'Public Key'} textarea />
      <div className={'formButtonGroup'}>
        <Link to={DASHBOARD_PATH}>
          <Core.Button size={'large'} type={'outline'}>
            {'Cancel'}
          </Core.Button>
        </Link>
        <Core.Button size={'large'}>{'Submit Verification'}</Core.Button>
      </div>
    </FormContainer>
  </StitchesSubmitForm>
);
