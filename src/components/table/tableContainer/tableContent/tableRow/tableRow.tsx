import {ComponentProps, FC, ReactElement, useCallback} from 'react';

import {faCaretSquareDown, faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';
import {CSS} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableRow} from './tableRow.styled';

interface PropTypes extends ComponentProps<typeof StitchesTableRow> {
  css?: CSS;
  kind?: 'green' | 'yellow' | 'red' | 'gray';
  statusAsIcon?: boolean;
  children: ReactElement[];
  override?: boolean;
  showCollapseBtn?: boolean;
  onCollapse?: (id: string) => void;
  isSelected?: boolean;
  rowId?: string;
  showLoadingMaskStatus?: boolean;
  showLoadingMaskBtn?: boolean;
  disableCollapseBtn?: boolean;
}

export const TableRow: FC<PropTypes> = ({
  css,
  children,
  kind,
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
        kind && (
          <td>
            <Core.Dot asIcon={statusAsIcon} kind={kind} />
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
            <Core.Button disabled={disableCollapseBtn} kind={'text'} onClick={onClick}>
              <Core.Icon icon={isSelected ? faCaretSquareDown : faCaretSquareRight} size={'lg'} />
            </Core.Button>
          </td>
        )
      )}
    </StitchesTableRow>
  );
};
