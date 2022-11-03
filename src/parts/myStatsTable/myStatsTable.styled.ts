export const tableContainerStyle = {
  width: '350px'
};

export const tableBodyStyle = {
  '& td': {
    height: '1px',
    '& div': {
      height: '100%',
      width: '100%',
      display: 'inline-flex',
      alignItems: 'center',
      boxSizing: 'border-box'
    },
    '&:nth-of-type(1) div': {
      paddingLeft: '$10'
    },
    '&:nth-of-type(2) div': {
      justifyContent: 'flex-end',
      paddingRight: '$10'
    }
  },
  '& tr:nth-of-type(1) td:nth-of-type(2)': {
    color: '$coverLightWhite'
  },
  '& tr:nth-of-type(2) div > div': {
    borderTop: '1px solid $coverSilver'
  },
  '& tr:nth-of-type(3) div > div': {
    borderTop: '1px solid $coverSilver'
  },
  '& tr:nth-of-type(4)': {
    borderTop: '1px solid $coverSilver',
    '& td:nth-of-type(2)': {
      color: '$coverLightWhite'
    }
  }
};
