import {styled} from '@stitches/react';

export const StitchesStatusDot = styled('span', {
  width: 8,
  height: 8,
  borderRadius: '50%',
  display: 'inline-block',
  variants: {
    status: {
      success: {
        backgroundColor: '#03BF00'
      },
      fail: {
        backgroundColor: '#ED3357'
      },
      pending: {
        backgroundColor: '#FFDF00'
      }
    }
  }
});
