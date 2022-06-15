import {createStitches} from '@stitches/react';
import type {ConfigType} from '@stitches/react/types/config';
import {opinionated} from 'stitches-normalize-css';

import {colors, radii, sizes, space, typography} from './foundations';

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
}: CreateStitchesConfig<Prefix, Media, Theme, ThemeMap, Utils> = {}) =>
  createStitches({
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
        ...space,
        ...(theme?.space || {})
      },
      sizes: {
        ...sizes,
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
        ...radii,
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

export const defaultStitches = createCustomStitches();

export const globalStyles = defaultStitches.globalCss(
  ...opinionated,
  {
    '@font-face': {
      fontFamily: 'Monaco',
      fontStyle: 'normal',
      fontWeight: 'normal',
      src: 'local("Monaco"), url("Monaco.woff") format("woff");'
    }
  },
  {
    table: {
      borderCollapse: 'collapse',
      borderSpacing: 0
    }
  },
  {
    html: {
      fontFamily: typography.fonts.monaco,
      background: colors.coverEbony
    }
  },
  {
    a: {
      all: 'unset',
      cursor: 'pointer'
    }
  }
);
