import React, {useCallback} from 'react';

import {faCaretSquareDown, faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableRow} from './tableRow.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableRow> {
  css?: CSS;
  type?: 'green' | 'yellow' | 'red';
  statusAsIcon?: boolean;
  children: React.ReactElement[];
  override?: boolean;
  showCollapseBtn?: boolean;
  onCollapse?: (id: string) => void;
  isSelected?: boolean;
  rowId?: string;
  showLoadingMaskStatus?: boolean;
  showLoadingMaskBtn?: boolean;
  disableCollapseBtn?: boolean;
}

export const TableRow: React.FC<PropTypes> = ({
  css,
  children,
  type,
  statusAsIcon,
  override,
  showCollapseBtn,
  isSelected,
  onCollapse,
  rowId,
  showLoadingMaskStatus,
  showLoadingMaskBtn,
  disableCollapseBtn
}) => {
  const onClick = useCallback(() => onCollapse && onCollapse(rowId as string), [rowId, onCollapse]);
  return (
    <StitchesTableRow css={css}>
      {showLoadingMaskStatus ? (
        <td>
          <Core.LoadingMask size={'dot'} />
        </td>
      ) : (
        type && (
          <td>
            <Core.Dot isIcon={statusAsIcon} type={type} />
          </td>
        )
      )}
      {children.map(c => (override ? c : <td key={c.key}>{c}</td>))}
      {showLoadingMaskBtn ? (
        <td>
          <Core.LoadingMask size={'dot'} />
        </td>
      ) : (
        showCollapseBtn && (
          <td>
            <Core.Button disabled={disableCollapseBtn} onClick={onClick} type={'text'}>
              <FontAwesomeIcon icon={isSelected ? faCaretSquareDown : faCaretSquareRight} size={'lg'} />
            </Core.Button>
          </td>
        )
      )}
    </StitchesTableRow>
  );
};
