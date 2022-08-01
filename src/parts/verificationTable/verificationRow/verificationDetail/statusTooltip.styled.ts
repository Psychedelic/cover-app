import {VerificationStatus} from './verificationDetail';

const getColor = (verificationStatus: VerificationStatus) => {
  switch (verificationStatus) {
    case 'green':
      return '$coverGreen';
    /*
     * Case 'yellow':
     * return '$coverYellow';
     */
    case 'red':
      return '$coverRed';
    default:
      return 'inherit';
  }
};

export const getCss = (verificationStatus: VerificationStatus) => ({
  color: getColor(verificationStatus),
  textDecoration: 'underline',
  cursor: 'pointer'
});
