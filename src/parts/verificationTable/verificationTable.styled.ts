export const tableContainerStyle = {
  '& tbody': {
    '& tr:nth-of-type(n+2)': {
      borderTop: '1px solid $coverSilver'
    },
    '& td:nth-of-type(3)': {
      color: '$coverLightWhite'
    },
    '& td:nth-of-type(4)': {
      color: '$coverLightWhite',
      textDecoration: 'underline'
    },
    '& td:nth-of-type(8)': {
      textAlign: 'center'
    },
    '& svg': {
      cursor: 'pointer'
    },
    '& td button': {
      padding: '$0'
    }
  }
};

export const tableContentTransparent = {
  '& td': {
    opacity: 0.3
  }
};

export const tableHeaderStyle = {
  '& th': {
    '&:last-of-type': {
      width: '$25'
    }
  }
};
