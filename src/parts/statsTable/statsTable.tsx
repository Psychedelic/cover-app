import React, {useEffect, useState} from 'react';

import {Stats} from '@psychedelic/cover';

import {TableContainer, TableContent, TableHeader, TableRow} from '@/components';
import {coverSDK} from '@/utils';

import {tableBodyStyle, tableContainerStyle} from './statsTable.styled';

interface Statistic {
  totalCanisters?: string;
  motokoCanistersCount?: string;
  rustCanistersCount?: string;
  buildSuccessCount?: string;
}

interface PropTypes {
  statistic?: Statistic;
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

const mapStats = (s: Stats): Statistic => ({
  totalCanisters: s.total_canisters.toString(),
  motokoCanistersCount: s.motoko_canisters_count.toString(),
  rustCanistersCount: s.rust_canisters_count.toString(),
  buildSuccessCount: s.build_success_count.toString()
});

export const StatsTable: React.VFC<PropTypes> = ({
  statistic = {
    totalCanisters: 'N/A',
    motokoCanistersCount: 'N/A',
    rustCanistersCount: 'N/A',
    buildSuccessCount: 'N/A'
  }
}) => {
  const [stats, setStats] = useState(statistic);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const s = await coverSDK.getVerificationStats();
      isMounted && setStats(mapStats(s));
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <TableContainer css={tableContainerStyle}>
      <TableHeader>
        <th colSpan={2}>{'Statistics'}</th>
      </TableHeader>
      <TableContent css={tableBodyStyle}>
        <TableRow override>{renderItems('Total Canisters', stats.totalCanisters)}</TableRow>
        <TableRow override>{renderItems('-- Motoko Canisters', stats.motokoCanistersCount)}</TableRow>
        <TableRow override>{renderItems('-- Rust Canisters', stats.rustCanistersCount)}</TableRow>
        <TableRow override>{renderItems('Build Success Canisters', stats.buildSuccessCount)}</TableRow>
      </TableContent>
    </TableContainer>
  );
};
