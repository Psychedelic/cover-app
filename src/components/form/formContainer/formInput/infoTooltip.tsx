import {FC} from 'react';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

interface PropTypes {
  info?: string;
}

export const InfoTooltip: FC<PropTypes> = ({info}) => (
  <Core.TooltipRoot delayDuration={200}>
    <Core.TooltipTrigger type={'button'}>
      <FontAwesomeIcon icon={faInfoCircle} />
    </Core.TooltipTrigger>
    <Core.TooltipContent side={'right'} sideOffset={5}>
      {info}
      <Core.TooltipArrow />
    </Core.TooltipContent>
  </Core.TooltipRoot>
);
