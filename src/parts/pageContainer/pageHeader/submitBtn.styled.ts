export const triggerBtnStyle = {
  '> svg': {
    marginLeft: 5
  }
};

export const popoverContentStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  width: 'auto',
  padding: '5px 0'
};

export const submitItemStyle = {
  cursor: 'pointer !important',
  padding: '10px 20px',
  margin: '0 !important',
  color: '$coverLightWhite',
  fontSize: '$sm',
  '&:hover': {
    textDecorationLine: 'none',
    background: '#3D3D3D'
  },
  '&[disabled]': {
    cursor: 'default !important',
    opacity: 0.3
  }
};
