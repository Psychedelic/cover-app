import React from 'react';

import {CSS} from '@stitches/react';
import {Link} from 'react-router-dom';

import {Core, Form} from '@/components';
import {DASHBOARD_PATH} from '@/constants';

import {StitchesSubmitForm} from './submitForm.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesSubmitForm> {
  css?: CSS;
}

export const SubmitForm: React.FC<PropTypes> = ({css}) => (
  <StitchesSubmitForm css={css}>
    <Form.Container>
      <h3>{'Submit Verification'}</h3>
      <Form.Input label={'User Principal ID'} />
      <Form.Input label={'Canister Principal ID'} />
      <Form.Input label={'Canister Name'} />
      <Form.Input label={'Github Repo'} />
      <Form.Input label={'Git Commit Hash'} />
      <Form.Input label={'User Access Token'} />
      <Form.Input label={'Rust Version'} />
      <Form.Input label={'DFX Version'} />
      <Form.Input label={'IC CDK Optimizer Needed'} />
      <Form.Input label={'Signature'} rows={3} textarea />
      <Form.Input label={'Public Key'} textarea />
      <div className={'formButtonGroup'}>
        <Link to={DASHBOARD_PATH}>
          <Core.Button size={'large'} type={'outline'}>
            {'Cancel'}
          </Core.Button>
        </Link>
        <Core.Button size={'large'}>{'Submit Verification'}</Core.Button>
      </div>
    </Form.Container>
  </StitchesSubmitForm>
);
