import React from 'react';
import useStyles from '../../../common/atoms/icon/styles';

const LoadingIcon: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingIcon}>
      <div className={classes.dot}></div>
    </div>
  );
};

export default LoadingIcon;
