import {faDiscord, faGithub, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faBook, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {Core} from '@/components';

import {menuStyle, StitchesMenuIcon, StitchesMenuItem, StitchesMenuText} from './pageHeader.styled';

export const MenuItems = () => (
  <Core.Popover>
    <Core.PopoverTrigger asChild>
      <Core.Button css={menuStyle} type={'outline'}>
        {'...'}
      </Core.Button>
    </Core.PopoverTrigger>
    <Core.PopoverContent sideOffset={10}>
      <StitchesMenuItem>
        <StitchesMenuIcon>
          <FontAwesomeIcon icon={faTwitter} size={'lg'} />
        </StitchesMenuIcon>
        <StitchesMenuText>
          <a href={'https://twitter.com/cover_ois'} rel={'noreferrer'} target={'_blank'}>
            {'Twitter'}
          </a>
        </StitchesMenuText>
      </StitchesMenuItem>
      <StitchesMenuItem>
        <StitchesMenuIcon>
          <FontAwesomeIcon icon={faNewspaper} size={'lg'} />
        </StitchesMenuIcon>
        <StitchesMenuText>
          <a href={'https://medium.com/@cover_ois'} rel={'noreferrer'} target={'_blank'}>
            {'Medium'}
          </a>
        </StitchesMenuText>
      </StitchesMenuItem>
      <StitchesMenuItem>
        <StitchesMenuIcon>
          <FontAwesomeIcon icon={faBook} size={'lg'} />
        </StitchesMenuIcon>
        <StitchesMenuText>
          <a href={'https://docs.covercode.ooo/'} rel={'noreferrer'} target={'_blank'}>
            {'Docs'}
          </a>
        </StitchesMenuText>
      </StitchesMenuItem>
      <StitchesMenuItem>
        <StitchesMenuIcon>
          <FontAwesomeIcon icon={faDiscord} size={'lg'} />
        </StitchesMenuIcon>
        <StitchesMenuText>
          <a href={'https://discord.gg/yVEcEzmrgm'} rel={'noreferrer'} target={'_blank'}>
            {'Discord'}
          </a>
        </StitchesMenuText>
      </StitchesMenuItem>
      <StitchesMenuItem>
        <StitchesMenuIcon>
          <FontAwesomeIcon icon={faGithub} size={'lg'} />
        </StitchesMenuIcon>
        <StitchesMenuText>
          <a href={'https://github.com/Psychedelic/cover'} rel={'noreferrer'} target={'_blank'}>
            {'Github'}
          </a>
        </StitchesMenuText>
      </StitchesMenuItem>
    </Core.PopoverContent>
  </Core.Popover>
);
