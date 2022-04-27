export const tableContainerStyle = {
  width: '350px'
};

export const tableBodyStyle = {
  color: '$coverLightWhite',
  '& tr:nth-of-type(n+2)': {
    borderTop: '1px solid $coverSilver'
  },
  '& td:nth-of-type(2)': {
    '& div': {
      width: '70px !important'
    }
  },
  '& td:nth-of-type(3)': {
    textAlign: 'center',
    textDecoration: 'underline',
    '& div': {
      width: '70px !important',
      margin: '0 auto'
    }
  },
  '& td:nth-of-type(4)': {
    textAlign: 'right',
    paddingRight: '$15',
    '& div': {
      width: '70px !important',
      float: 'right'
    }
  }
};
