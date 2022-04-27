import React from 'react';

import {Core, TableContainer, TableContent, TableHeader, TableRow} from '@/components';

import {tableBodyStyle} from './statsTable.styled';

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
      <Core.LoadingMask>
        <div>{value}</div>
      </Core.LoadingMask>
    </div>
  </td>
];

export const StatsTable: React.VFC<PropTypes> = ({
  stats: {rustCanistersCount, motokoCanistersCount, totalCanisters, buildSuccessCount} = {}
}) => (
  <TableContainer>
    <TableHeader>{['Statistics']}</TableHeader>
    <TableContent css={tableBodyStyle}>
      <TableRow override>{renderItems('Total Canisters', totalCanisters)}</TableRow>
      <TableRow override>{renderItems('-- Motoko Canisters', motokoCanistersCount)}</TableRow>
      <TableRow override>{renderItems('-- Rust Canisters', rustCanistersCount)}</TableRow>
      <TableRow override>{renderItems('Total Verified Canisters', buildSuccessCount)}</TableRow>
    </TableContent>
  </TableContainer>
);
