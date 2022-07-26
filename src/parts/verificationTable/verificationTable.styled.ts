export const tableContainerStyle = {
  width: '850px',
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
      textAlign: 'center',
      '& div': {
        margin: '0 auto'
      }
    },
    '& svg': {
      cursor: 'pointer'
    },
    '& td button': {
      padding: '$0',
      height: 'inherit'
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
      width: '$40'
    },
    '&:nth-of-type(3), &:nth-of-type(4)': {
      width: '150px'
    }
  }
};
