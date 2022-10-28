import {faInbox} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';

import {Core} from '@/components';
import {BUILD_CONFIG_SUBMIT_PATH} from '@/constants';

import {
  StitchesTableEmptyCell,
  StitchesTableEmptyContent,
  StitchesTableEmptyMainText,
  StitchesTableEmptyRow,
  StitchesTableEmptySecondText
} from './buildConfigEmpty.styled';

export const BuildConfigEmpty = () => (
  <StitchesTableEmptyRow>
    <StitchesTableEmptyCell colSpan={8}>
      <StitchesTableEmptyContent>
        <FontAwesomeIcon color={'#232323'} icon={faInbox} size={'7x'} />
        <StitchesTableEmptyMainText>{`You don't have any Build Config registered`}</StitchesTableEmptyMainText>
        <StitchesTableEmptySecondText>
          {`It's OK, You can get started and create a Build Config.`}
        </StitchesTableEmptySecondText>
        <Link to={BUILD_CONFIG_SUBMIT_PATH}>
          {' '}
          <Core.Button kind={'main'} size={'large'}>
            {'Create a Build Config'}
          </Core.Button>
        </Link>
      </StitchesTableEmptyContent>
    </StitchesTableEmptyCell>
  </StitchesTableEmptyRow>
);
