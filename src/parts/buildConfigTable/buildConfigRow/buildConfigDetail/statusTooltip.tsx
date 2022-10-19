import {FC} from 'react';

import {Core} from '@/components';

import {BuildConfigStatus} from './buildConfigDetail';
import {getCss} from './statusTooltip.styled';

interface PropTypes {
  text: string;
  info: string;
  buildConfigStatus?: BuildConfigStatus;
}

export const StatusTooltip: FC<PropTypes> = ({info, text, buildConfigStatus}) => (
  <Core.TooltipProvider>
    <Core.TooltipRoot delayDuration={200}>
      <Core.TooltipTrigger css={getCss(buildConfigStatus)} type={'button'}>
        {text}
      </Core.TooltipTrigger>
      <Core.TooltipContent align={'end'} side={'right'} sideOffset={10}>
        {info}
      </Core.TooltipContent>
    </Core.TooltipRoot>
  </Core.TooltipProvider>
);
