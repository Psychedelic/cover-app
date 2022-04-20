import React from 'react';

import {TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle} from './statsTable.styled';

export const StatsTable: React.VFC = () => (
  <TableContainer>
    <TableHeader>{['Statistics']}</TableHeader>
    <TableContent css={tableBodyStyle}>
      <TableRow>
        <span>{'Total Canisters'}</span>
        <span>{'6,296'}</span>
      </TableRow>
      <TableRow>
        <span>{'-- Motoko Canisters'}</span>
        <span>{'3,823'}</span>
      </TableRow>
      <TableRow>
        <span>{'-- Rust Canisters'}</span>
        <span>{'2,473'}</span>
      </TableRow>
      <TableRow>
        <span>{'Total verified canisters'}</span>
        <span>{'4,012'}</span>
      </TableRow>
    </TableContent>
  </TableContainer>
);
