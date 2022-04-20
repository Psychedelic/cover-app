import React from 'react';

import {TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle} from './statsTable.styled';

interface Stats {
  rustCanistersCount: string;
  motokoCanistersCount: string;
  totalCanisters: string;
  buildSuccessCount: string;
}

interface PropTypes {
  stats?: Stats;
}

export const StatsTable: React.VFC<PropTypes> = ({
  stats: {rustCanistersCount, motokoCanistersCount, totalCanisters, buildSuccessCount} = {}
}) => (
  <TableContainer>
    <TableHeader>{['Statistics']}</TableHeader>
    <TableContent css={tableBodyStyle}>
      <TableRow override>
        <td colSpan={2}>
          <div>{'Total Canisters'}</div>
        </td>
        <td>
          <div>{totalCanisters}</div>
        </td>
      </TableRow>
      <TableRow override>
        <td colSpan={2}>
          <div>{'-- Motoko Canisters'}</div>
        </td>
        <td>
          <div>{motokoCanistersCount}</div>
        </td>
      </TableRow>
      <TableRow override>
        <td colSpan={2}>
          <div>{'-- Rust Canisters'}</div>
        </td>
        <td>
          <div>{rustCanistersCount}</div>
        </td>
      </TableRow>
      <TableRow override>
        <td colSpan={2}>
          <div>{'Total Verified Canisters'}</div>
        </td>
        <td>
          <div>{buildSuccessCount}</div>
        </td>
      </TableRow>
    </TableContent>
  </TableContainer>
);
