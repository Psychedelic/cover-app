export const searchBarStyled = {
  color: '$coverLightGray',
  '& input': {
    color: 'inherit'
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
  color: '$coverLightWhite'
};

export const hasErrorStyled = {
  ...searchBarStyled,
  border: '1px solid $coverRed',
  color: '$coverRed'
};
