import {colors, darkColors, customStitches} from '@/themes';

const {styled} = customStitches;

const Flex = styled('div', { display: 'flex' });

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      violet: {
        backgroundColor: colors.red1,
        color: colors.slate7,
        boxShadow: `0 2px 10px ${colors.red3}`,
        '&:hover': {backgroundColor: colors.purple5},
        '&:focus': {boxShadow: `0 0 0 2px ${colors.slate3}`},
      },
      green: {
        backgroundColor: darkColors.red1,
        color: darkColors.slate7,
        boxShadow: `0 2px 10px ${darkColors.red3}`,
        '&:hover': {backgroundColor: darkColors.purple5},
        '&:focus': {boxShadow: `0 0 0 2px ${darkColors.slate3}`},
      },
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

export const MainBtn = () => (
  <Flex css={{marginTop: 20, justifyContent: 'flex-end'}}>
    <Button variant="green">Save changes</Button>
  </Flex>
);
