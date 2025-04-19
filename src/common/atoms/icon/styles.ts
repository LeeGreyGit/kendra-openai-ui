import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    loadingIcon: {
      display: 'flex',
      padding: '16px',
      justifyContent: 'center'
    },
    dot: {
      position: 'relative',
      left: '-9999px',
      width: 10,
      height: 10,
      borderRadius: 5,
      color: '#607D8B',
      boxShadow:
        '9984px 0 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      animation: '$dotTyping 1.5s infinite linear',
    },
    '@keyframes dotTyping': {
      '0%': {
        boxShadow:
          '9984px 0 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      },
      '16.667%': {
        boxShadow:
          '9984px -10px 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      },
      '33.333%': {
        boxShadow:
          '9984px 0 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      },
      '50%': {
        boxShadow:
          '9984px 0 0 0 #607D8B, 9999px -10px 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      },
      '66.667%': {
        boxShadow:
          '9984px 0 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      },
      '83.333%': {
        boxShadow:
          '9984px 0 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px -10px 0 0 #607D8B',
      },
      '100%': {
        boxShadow:
          '9984px 0 0 0 #607D8B, 9999px 0 0 0 #607D8B, 10014px 0 0 0 #607D8B',
      },
    },
  })
);
export default useStyles;
