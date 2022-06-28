import {createRef, FC, useCallback, useEffect} from 'react';

import {faClock, faGear, faRotate} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core, FormInput, FormInputHandler} from '@/components';
import {loadCoverSettings, setCoverSettings, useCoverSettingsContext} from '@/contexts';
import {isPositiveNum} from '@/utils';

import {StitchesSettingsLeft, StitchesSettingsRight, StitchesSettingsRow} from './settings.styled';

export const Settings: FC = () => {
  const refreshIntervalRef = createRef<FormInputHandler>();

  const {
    state: {coverSettings},
    dispatch
  } = useCoverSettingsContext();

  useEffect(() => {
    loadCoverSettings(dispatch);
  }, [dispatch]);

  const onCheckedChange = useCallback(
    (checked: boolean) => {
      const newSettings = {isAutoRefresh: checked, refreshInterval: coverSettings.refreshInterval};
      setCoverSettings(newSettings, dispatch);
    },
    [coverSettings, dispatch]
  );

  const onRefreshIntervalBlur = useCallback(
    (interval: string) => {
      if (!isPositiveNum(interval)) {
        refreshIntervalRef.current?.setValue(coverSettings.refreshInterval);
        return;
      }
      const newInterval = `${Math.min(parseInt(interval, 10), 10)}`;
      refreshIntervalRef.current?.setValue(newInterval);
      const newSettings = {isAutoRefresh: coverSettings.isAutoRefresh, refreshInterval: newInterval};
      setCoverSettings(newSettings, dispatch);
    },
    [coverSettings, dispatch, refreshIntervalRef]
  );

  return (
    <Core.Popover>
      <Core.PopoverTrigger asChild>
        <Core.Button kind={'outline'}>
          <FontAwesomeIcon icon={faGear} />
        </Core.Button>
      </Core.PopoverTrigger>
      <Core.PopoverContent sideOffset={10}>
        <StitchesSettingsRow>
          <StitchesSettingsLeft>
            <FontAwesomeIcon icon={faRotate} />
            {' Auto Refresh'}
          </StitchesSettingsLeft>
          <StitchesSettingsRight>
            <Core.Switch defaultChecked={coverSettings.isAutoRefresh} onCheckedChange={onCheckedChange} />
          </StitchesSettingsRight>
        </StitchesSettingsRow>
        <StitchesSettingsRow>
          <StitchesSettingsLeft>
            <FontAwesomeIcon icon={faClock} />
            {' Refresh Interval'}
          </StitchesSettingsLeft>
          <StitchesSettingsRight>
            <FormInput
              defaultValue={coverSettings.refreshInterval}
              disabled={!coverSettings.isAutoRefresh}
              onBlurHandler={onRefreshIntervalBlur}
              placeholder={'-'}
              ref={refreshIntervalRef}
            />
            <span>{'min'}</span>
          </StitchesSettingsRight>
        </StitchesSettingsRow>
      </Core.PopoverContent>
    </Core.Popover>
  );
};
