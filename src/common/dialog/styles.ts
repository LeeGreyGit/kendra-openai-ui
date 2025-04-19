import {baseColor, primaryColor} from '../../common/themes/BaseStyles';
import {createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      top: '-240px',
    },
    title: {
      borderBottom: '1px solid #C4C4C4',
      padding: '8px 1.4rem',
      '& > h2': {
        maxWidth: '100%',
        minWidth: '360px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    message: {
      padding: '24px !important',
      whiteSpace: 'pre-line',
      '& > p': {
        color: baseColor.black,
      },
    },
    footer: {
      borderTop: '1px solid #C4C4C4',
      display: 'flex',
    },
    spaceBetween: {
      justifyContent: 'space-between',
    },
    rightButton: {
      display: 'flex',
      columnGap: '8px',
    },
    button: {
      width: '120px',
    },
    closeIcon: {
      width: '36px',
      height: '36px',
      cursor: 'pointer',
      padding: '2px',
      '&:hover': {
        borderRadius: '18px',
        background: primaryColor[50],
      },
    },
  })
);
export default useStyles;
