import {createStitches} from '@stitches/react';
import type {ConfigType} from '@stitches/react/types/config';

import {
  colors,
  darkColors,
  typography
  // u can add the rest here if you need
  // ex spaces, sizes, radii, shadows, etc
} from './foundations';

export interface CreateStitchesConfig<Prefix, Media, Theme, ThemeMap, Utils> {
  prefix?: ConfigType.Prefix<Prefix>;
  media?: ConfigType.Media<Media>;
  theme?: ConfigType.Theme<Theme>;
  themeMap?: ConfigType.ThemeMap<ThemeMap>;
  utils?: ConfigType.Utils<Utils>;
}

export const createCustomStitches = <Prefix, Media, Theme, ThemeMap, Utils>({
  prefix,
  theme,
  themeMap,
  utils,
  media
}: CreateStitchesConfig<Prefix, Media, Theme, ThemeMap, Utils> = {}) => {
  const {createTheme, ...otherStitches} = createStitches({
    prefix: prefix || ('cover' as string),
    media: {
      ...(media || {})
    },
    theme: {
      colors: {
        ...colors,
        ...(theme?.colors || {})
      },
      space: {
        ...(theme?.space || {})
      },
      sizes: {
        ...(theme?.sizes || {})
      },
      fontWeights: {
        ...typography.fontWeights,
        ...(theme?.fontWeights || {})
      },
      fonts: {
        ...typography.fonts,
        ...(theme?.fonts || {})
      },
      letterSpacings: {
        ...(theme?.letterSpacings || {})
      },
      lineHeights: {
        ...(theme?.lineHeights || {})
      },
      fontSizes: {
        ...typography.fontSizes,
        ...(theme?.fontSizes || {})
      },
      radii: {
        ...(theme?.radii || {})
      },
      shadows: {
        ...(theme?.shadows || {})
      },
      zIndices: {
        ...(theme?.zIndices || {})
      },
      ...(theme || {})
    },
    themeMap,
    utils: {
      ...(utils || {})
    }
  });

  const darkTheme = createTheme({
    colors: darkColors
  });

  return {
    createTheme,
    darkTheme,
    darkThemeSelector: `.${darkTheme} &`,
    ...otherStitches
  };
};

export const defaultStitches = createCustomStitches();
