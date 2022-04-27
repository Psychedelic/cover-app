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
          <div>
            <div>{'Total Canisters'}</div>
          </div>
        </td>
        <td>
          <div>
            <div>{totalCanisters}</div>
          </div>
        </td>
      </TableRow>
      <TableRow override>
        <td colSpan={2}>
          <div>
            <div>{'-- Motoko Canisters'}</div>
          </div>
        </td>
        <td>
          <div>
            <div>{motokoCanistersCount}</div>
          </div>
        </td>
      </TableRow>
      <TableRow override>
        <td colSpan={2}>
          <div>
            <div>{'-- Rust Canisters'}</div>
          </div>
        </td>
        <td>
          <div>
            <div>{rustCanistersCount}</div>
          </div>
        </td>
      </TableRow>
      <TableRow override>
        <td colSpan={2}>
          <div>
            <div>{'Total Verified Canisters'}</div>
          </div>
        </td>
        <td>
          <div>
            <div>{buildSuccessCount}</div>
          </div>
        </td>
      </TableRow>
    </TableContent>
  </TableContainer>
);
