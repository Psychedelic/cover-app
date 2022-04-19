import {faSearch} from '@fortawesome/free-solid-svg-icons';

import {Core} from '@/components';

export const SearchBar = () => (
  <Core.InputContainer bg={'gray'} icon={faSearch} size={'small'}>
    <Core.InputContent placeholder={'Search by Canister ID'} size={'small'} />
  </Core.InputContainer>
);
