import {BuildConfigStatus} from './buildConfigDetail';

const getColor = (buildConfigStatus: BuildConfigStatus) => {
  switch (buildConfigStatus) {
    case 'green':
      return '$coverGreen';
    case 'red':
      return '$coverRed';
    default:
      return 'inherit';
  }
};

export const getCss = (buildConfigStatus: BuildConfigStatus) => ({
  color: getColor(buildConfigStatus),
  textDecoration: 'underline',
  cursor: 'pointer'
});
