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

export const tableRowSelected = {
  background: '$coverInk',
  '& td': {
    opacity: 1
  },
  '+ tr td div': {
    borderTop: '1px solid $coverSilver'
  },
  '+ tr, + tr + tr, + tr + tr + tr, + tr + tr + tr + tr': {
    border: 'none !important',
    background: '$coverInk',
    '& td': {
      opacity: 1,
      height: '1px',
      textDecoration: 'none !important',
      '& div': {
        height: '100%',
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center'
      }
    },
    '& td:nth-of-type(odd) div': {
      color: '$coverLightGray'
    },
    '& td:nth-of-type(even) div': {
      color: '$coverLightWhite',
      justifyContent: 'flex-end'
    }
  },
  '+ tr': {
    '& td:nth-of-type(1) div span': {
      padding: '25px 0px 10px 25px'
    },
    '& td:nth-of-type(2) div span': {
      padding: '25px 50px 10px 0px'
    },
    '& td:nth-of-type(3) div span': {
      padding: '25px 0px 10px 0px'
    },
    '& td:nth-of-type(4) div span': {
      padding: '25px 50px 10px 0px'
    }
  },
  '+ tr + tr, + tr + tr + tr': {
    '& td:nth-of-type(1) div span': {
      padding: '10px 0px 10px 25px'
    },
    '& td:nth-of-type(2) div span': {
      padding: '10px 50px 10px 0px'
    },
    '& td:nth-of-type(3) div span': {
      padding: '10px 0px'
    },
    '& td:nth-of-type(4) div span': {
      padding: '10px 50px 10px 0px'
    }
  },
  '+ tr + tr + tr + tr': {
    '& td:nth-of-type(1) div span': {
      padding: '10px 0px 25px 25px'
    },
    '& td:nth-of-type(2) div span': {
      padding: '10px 50px 25px 0px'
    },
    '& td:nth-of-type(3) div span': {
      padding: '10px 0px 25px 0px'
    },
    '& td:nth-of-type(4) div span': {
      padding: '10px 50px 25px 0px',
      '& a': {
        textDecoration: 'none',
        color: '$coverBlue'
      }
    }
  }
};
