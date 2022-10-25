import {FC} from 'react';

import {faChevronDown, faLightbulb, faRightFromBracket, faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

import {Core} from '@/components';
import {BUILD_CONFIG_SUBMIT_PATH, MY_CANISTER_PATH} from '@/constants';
import {isBuildConfigSubmitPage, isMyCanisterPage, trim} from '@/utils';

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
          <FontAwesomeIcon icon={faLightbulb} />
          {'My Canisters'}
        </Core.Button>
      </Link>
      <Link to={BUILD_CONFIG_SUBMIT_PATH}>
        <Core.Button css={submitItemStyle} disabled={isBuildConfigSubmitPage()} kind={'text'}>
          <FontAwesomeIcon icon={faScrewdriverWrench} />
          {'Add build config'}
        </Core.Button>
      </Link>
      <Core.Button css={submitItemStyle} kind={'text'} onClick={onLogOut}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        {'Log out'}
      </Core.Button>
    </Core.PopoverContent>
  </Core.Popover>
);
