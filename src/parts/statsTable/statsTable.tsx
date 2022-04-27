import React from 'react';

import {TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle, tableContainerStyle} from './statsTable.styled';

interface Stats {
  rustCanistersCount?: string;
  motokoCanistersCount?: string;
  totalCanisters?: string;
  buildSuccessCount?: string;
}

interface PropTypes {
  stats?: Stats;
}

const renderItems = (label: string, value?: string) => [
  <td colSpan={2} key={0}>
    <div>
      <div>{label}</div>
    </div>
  </td>,
  <td key={1}>
    <div>
      <div>{value}</div>
    </div>
  </td>
];

export const StatsTable: React.VFC<PropTypes> = ({
  stats: {rustCanistersCount = '0', motokoCanistersCount = '0', totalCanisters = '0', buildSuccessCount = '0'} = {}
}) => (
  <TableContainer css={tableContainerStyle}>
    <TableHeader>
      <th colSpan={2}>{'Statistics'}</th>
    </TableHeader>
    <TableContent css={tableBodyStyle}>
      <TableRow override>{renderItems('Total Canisters', totalCanisters)}</TableRow>
      <TableRow override>{renderItems('-- Motoko Canisters', motokoCanistersCount)}</TableRow>
      <TableRow override>{renderItems('-- Rust Canisters', rustCanistersCount)}</TableRow>
      <TableRow override>{renderItems('Total Verified Canisters', buildSuccessCount)}</TableRow>
    </TableContent>
  </TableContainer>
);
