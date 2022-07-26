import {FC} from 'react';

import {Core} from '@/components';

import {getCss} from './statusTooltip.styled';
import {VerificationStatus} from './verificationDetail';

interface PropTypes {
  text: string;
  info: string;
  verificationStatus?: VerificationStatus;
}

export const StatusTooltip: FC<PropTypes> = ({info, text, verificationStatus}) => (
  <Core.TooltipProvider>
    <Core.TooltipRoot delayDuration={200}>
      <Core.TooltipTrigger css={getCss(verificationStatus)} type={'button'}>
        {text}
      </Core.TooltipTrigger>
      <Core.TooltipContent align={'end'} side={'right'} sideOffset={10}>
        {info}
      </Core.TooltipContent>
    </Core.TooltipRoot>
  </Core.TooltipProvider>
);
