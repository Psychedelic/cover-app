import React, {useCallback, useMemo} from 'react';

import {faCaretSquareDown, faCaretSquareRight} from '@fortawesome/free-solid-svg-icons';
import {CSS, VariantProps} from '@stitches/react';

import {Core} from '@/components';

import {StitchesTableRow} from './tableRow.styled';

interface PropTypes extends React.ComponentProps<typeof StitchesTableRow> {
  css?: CSS;
  type?: VariantProps<typeof Core.Dot>;
  children: React.ReactElement[];
  override?: boolean;
  showCollapseBtn?: boolean;
  onCollapse?: (id: string) => void;
  isSelected?: boolean;
  rowId?: string;
}

export const TableRow: React.FC<PropTypes> = React.memo(
  ({css, children, type, override, showCollapseBtn, isSelected, onCollapse, rowId}) => {
    const onClick = useCallback(() => onCollapse && onCollapse(rowId as string), [rowId, onCollapse]);
    const Collapse = useMemo(
      () =>
        showCollapseBtn && (
          <td>
            <Core.Button onClick={onClick} type={'text'}>
              <Core.FontIcon icon={isSelected ? faCaretSquareDown : faCaretSquareRight} size={'lg'} />
            </Core.Button>
          </td>
        ),
      [showCollapseBtn, isSelected, onClick]
    );
    return (
      <StitchesTableRow css={css}>
        {type && (
          <td>
            <Core.Dot type={type} />
          </td>
        )}
        {children.map(c => (override ? c : <td key={c.key}>{c}</td>))}
        {Collapse}
      </StitchesTableRow>
    );
  }
);
