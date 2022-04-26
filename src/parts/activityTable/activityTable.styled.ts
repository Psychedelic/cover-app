export const tableBodyStyle = {
  color: '$coverLightWhite',
  '& tr:nth-of-type(n+2)': {
    borderTop: '1px solid $coverSilver'
  },
  '& td:nth-of-type(3)': {
    textAlign: 'center',
    textDecoration: 'underline',
    '& div': {
      display: 'inline-flex'
    }
  },
  '& td:nth-of-type(4)': {
    textAlign: 'right',
    '& div': {
      display: 'inline-flex'
    }
  }
};
