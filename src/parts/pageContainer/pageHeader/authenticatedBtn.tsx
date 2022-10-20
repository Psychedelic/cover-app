import {FC} from 'react';

import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

import {Core} from '@/components';
import {MY_CANISTER_PATH} from '@/constants';
import {isMyCanisterPage, trim} from '@/utils';

import {popoverContentStyle, submitItemStyle, triggerBtnStyle} from './submitBtn.styled';

interface PropTypes {
  pid: string;
  onLogOut: () => void;
}

export const AuthenticatedBtn: FC<PropTypes> = ({pid, onLogOut}) => (
  <Core.Popover>
    <Core.PopoverTrigger asChild>
      <Core.Button css={triggerBtnStyle} kind={'outline'}>
        {trim(pid)}
        <FontAwesomeIcon icon={faChevronDown} />
      </Core.Button>
    </Core.PopoverTrigger>
    <Core.PopoverContent align={'end'} css={popoverContentStyle} side={'bottom'} sideOffset={10}>
      <Link to={MY_CANISTER_PATH}>
        <Core.Button css={submitItemStyle} disabled={isMyCanisterPage()} kind={'text'}>
          {'My Canisters'}
        </Core.Button>
      </Link>
      <Core.Button css={submitItemStyle} kind={'text'} onClick={onLogOut}>
        {'Log out'}
      </Core.Button>
    </Core.PopoverContent>
  </Core.Popover>
);
