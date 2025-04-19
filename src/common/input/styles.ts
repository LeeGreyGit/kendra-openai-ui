import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      minHeight: '64px',
      marginTop: '8px',
      '& div > input': {
        minHeight: '40px',
      },
    },
    helperText: {
      margin: '0 0 -23px',
    },
  })
);
export default useStyles;
