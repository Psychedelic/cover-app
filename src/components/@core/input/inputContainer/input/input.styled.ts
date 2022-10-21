import {memo} from 'react';

import {defaultStitches} from '@/themes';
const {styled} = defaultStitches;

export const StitchesInput = memo(
  styled('input', {
    all: 'unset',
    color: '$coverMediumWhite',
    width: '100%',
    boxSizing: 'border-box',
    '&[disabled]': {
      color: '$coverWhiteOpacity'
    },
    variants: {
      size: {
        small: {
          height: '$28',
          fontSize: '$xs'
        },
        medium: {
          height: '$44',
          fontSize: '$sm'
        }
      }
    },
    defaultVariants: {
      size: 'medium'
    }
  })
);
