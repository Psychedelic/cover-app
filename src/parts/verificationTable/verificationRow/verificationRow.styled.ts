export const tableRowSelected = {
  background: '$coverInk',
  '& td': {
    opacity: '1 !important'
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
