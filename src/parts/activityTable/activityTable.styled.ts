export const tableBodyStyle = {
  color: '$coverLightWhite',
  '& tr:nth-of-type(n+2)': {
    borderTop: '1px solid $coverSilver'
  },
  '& td:nth-of-type(3)': {
    textAlign: 'center',
    textDecoration: 'underline',
    '& div': {
      margin: '0 auto'
    }
  },
  '& td:nth-of-type(4)': {
    textAlign: 'right',
    paddingRight: '$15',
    '& div': {
      float: 'right'
    }
  }
};
