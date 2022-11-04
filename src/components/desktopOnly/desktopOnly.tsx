import {FC, ReactElement, useCallback, useEffect, useState} from 'react';

import {faDiscord, faMedium, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {desktopBottomLeftCorner, desktopTopRightCorner, logo} from '@/assets';
import {Core} from '@/components';

import {
  StitchesBottomLeftImg,
  StitchesContainer,
  StitchesDescription,
  StitchesInnerContainer,
  StitchesLogoImg,
  StitchesMedia,
  StitchesOuterContainer,
  StitchesTopRightImg
} from './desktopOnly.styled';

interface PropTypes {
  children: ReactElement;
}

export const DesktopOnly: FC<PropTypes> = ({children}) => {
  const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth});

  const isDesktop = windowSize.width >= 1260;

  const updateWindowSize = useCallback(() => {
    setWindowSize({height: window.innerHeight, width: window.innerWidth});
  }, []);

  useEffect(() => {
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, [updateWindowSize]);

  return isDesktop ? (
    children
  ) : (
    <StitchesOuterContainer css={{height: windowSize.height}}>
      <StitchesTopRightImg alt={'background'} src={desktopTopRightCorner} />
      <StitchesContainer>
        <StitchesInnerContainer>
          <StitchesLogoImg src={logo} />
          <StitchesDescription>
            <p>{'Desktop Only'}</p>
            <p>{'Cover is an open internet service available only on desktop browser.'}</p>
          </StitchesDescription>
          <StitchesMedia>
            <a href={'https://discord.gg/yVEcEzmrgm'} rel={'noreferrer'} target={'_blank'}>
              <Core.Button kind={'outline'}>
                <FontAwesomeIcon icon={faDiscord} size={'lg'} />
              </Core.Button>
            </a>
            <a href={'https://twitter.com/cover_ois'} rel={'noreferrer'} target={'_blank'}>
              <Core.Button kind={'outline'}>
                <FontAwesomeIcon icon={faTwitter} size={'lg'} />
              </Core.Button>
            </a>
            <a href={'https://medium.com/@cover_ois'} rel={'noreferrer'} target={'_blank'}>
              <Core.Button kind={'outline'}>
                <FontAwesomeIcon icon={faMedium} size={'lg'} />
              </Core.Button>
            </a>
            <a href={'https://docs.covercode.ooo/'} rel={'noreferrer'} target={'_blank'}>
              <Core.Button kind={'outline'}>
                <FontAwesomeIcon icon={faBook} size={'lg'} />
              </Core.Button>
            </a>
          </StitchesMedia>
        </StitchesInnerContainer>
      </StitchesContainer>
      <StitchesBottomLeftImg alt={'background'} src={desktopBottomLeftCorner} />
    </StitchesOuterContainer>
  );
};
