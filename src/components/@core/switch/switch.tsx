import {FC} from 'react';

import {SwitchProps} from '@radix-ui/react-switch';

import {StitchesSwitch, StitchesThumb} from './switch.styled';

export const Switch: FC<SwitchProps> = ({checked, defaultChecked, required, onCheckedChange}) => (
  <StitchesSwitch
    checked={checked}
    defaultChecked={defaultChecked}
    onCheckedChange={onCheckedChange}
    required={required}>
    <StitchesThumb />
  </StitchesSwitch>
);
