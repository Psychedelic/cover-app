export const searchBarStyled = {
  '& input': {
    color: '$coverLightWhite'
  },
  '& button': {
    padding: '$0',
    marginLeft: '$5',
    height: 'inherit',
    color: '$coverRed',
    ':hover': {
      cursor: 'pointer'
    },
    '& svg': {
      margin: '$0',
      color: 'inherit'
    }
  }
};

export const hasValueStyled = {
  ...searchBarStyled,
  '& svg': {
    color: '$coverLightWhite'
  }
};
