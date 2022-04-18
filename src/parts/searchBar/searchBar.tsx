import {faSearch} from '@fortawesome/free-solid-svg-icons';

import {InputContainer, InputContent} from '@/components';

export const SearchBar = () => (
  <InputContainer bg={'gray'} icon={faSearch}>
    <InputContent placeholder={'Search by Canister ID'} size={'small'} />
  </InputContainer>
);
