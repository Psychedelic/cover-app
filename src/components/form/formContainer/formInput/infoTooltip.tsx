import {FC} from 'react';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

interface PropTypes {
  info?: string;
  hasArrow?: boolean;
}

export const InfoTooltip: FC<PropTypes> = ({info, hasArrow}) => (
  <Core.TooltipProvider>
    <Core.TooltipRoot delayDuration={200}>
      <Core.TooltipTrigger type={'button'}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </Core.TooltipTrigger>
      <Core.TooltipContent side={'right'} sideOffset={5}>
        {info}
        {hasArrow && <Core.TooltipArrow />}
      </Core.TooltipContent>
    </Core.TooltipRoot>
  </Core.TooltipProvider>
);
