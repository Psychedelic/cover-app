import {faAtom, faChevronDown, faPencil} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

import {Core} from '@/components';
import {AUTOMATIC_SUBMIT_PATH, STANDARD_SUBMIT_PATH} from '@/constants';
import {isAutoSubmitPage, isStandardSubmitPage} from '@/utils';

import {popoverContentStyle, submitItemStyle, triggerBtnStyle} from './submitBtn.styled';

export const SubmitBtn = () => (
  <Core.Popover>
    <Core.PopoverTrigger asChild>
      <Core.Button css={triggerBtnStyle}>
        {'Submit Verification'}
        <Core.Icon icon={faChevronDown} />
      </Core.Button>
    </Core.PopoverTrigger>
    <Core.PopoverContent align={'end'} css={popoverContentStyle} side={'bottom'} sideOffset={10}>
      <Link to={STANDARD_SUBMIT_PATH}>
        <Core.Button css={submitItemStyle} disabled={isStandardSubmitPage()} kind={'text'}>
          <Core.Icon icon={faPencil} />
          {'Standard Verification'}
        </Core.Button>
      </Link>
      <Link to={AUTOMATIC_SUBMIT_PATH}>
        <Core.Button css={submitItemStyle} disabled={isAutoSubmitPage()} kind={'text'}>
          <Core.Icon icon={faAtom} />
          {'Automatic Verification'}
        </Core.Button>
      </Link>
    </Core.PopoverContent>
  </Core.Popover>
);
