import {createStyles, makeStyles} from '@material-ui/core';
import {baseColor, primaryFonts, primaryColor} from '../common/themes/BaseStyles';

interface FileProps {
  fileWidth?: number;
  fileHeight?: number;
  openChatBot?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    chatbotRoot: {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      rowGap: "8px",
    },
    noData: {
      display: "flex",
      padding: "24px",
      justifyContent: "center",
      fontSize: primaryFonts.size.large,
    },
    title: {
      fontSize: primaryFonts.size.xxLarge,
      color: primaryColor[700],
      fontWeight: "bold",
    },
    inputText: {
      borderRadius: "4px",
    },
    sendIconActive: {
      cursor: "pointer",
      color: "dodgerblue",
      "&:hover": {
        color: primaryColor[400],
      },
    },
    sendIconDisabled: {
      color: primaryColor[400],
    },
    result: {},
    pagination: {
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    paginationLeft: {
      columnGap: "8px",
      display: "flex",
      alignItems: "center",
    },
    selectedOption: {
      width: "160px",
    },
    paginationRight: {
      columnGap: "8px",
      display: "flex",
      alignItems: "center",
    },
    sortOptions: {},
    resultBody: {
      display: "flex",
      flexDirection: "column",
      rowGap: "8px",
    },
    fileData: {
      backgroundColor: baseColor.primary10,
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: primaryColor[100],
      },
    },
    fileName: {
      padding: "8px 16px",
      fontWeight: "bold",
      fontSize: primaryFonts.size.large,
      maxWidth: "100%",
      color: primaryColor[800],
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: `1px solid ${baseColor.gray}`,
    },
    buttonlist: {
      display: "flex",
      alignItems: "center",
      justifyContent: "end",
      columnGap: "8px",
    },
    fileBody: {
      padding: "16px",
    },
    fileUrl: {
      padding: "0px 16px 16px",
      maxWidth: "100%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      cursor: "pointer",
      fontSize: primaryFonts.size.small,
      color: baseColor.link,
      "&:hover": {
        color: primaryColor[500],
        textDecoration: "underline",
      },
    },
    fileIcon: {
      width: "24px",
      height: "24px",
      cursor: "pointer",
      "&:hover": {
        borderRadius: "18px",
        background: primaryColor[300],
      },
      "&.disabled": {
        cursor: "auto",
        "&:hover": {
          borderRadius: "0",
          background: "none",
        },
      },
    },
    pdfContainer: {
      width: (props: FileProps): number | string =>
        props.fileWidth ? props.fileWidth : "max-content",
      height: (props: FileProps): number | string =>
        props.fileHeight ? props.fileHeight : "max-content",
    },
    pdfPage: {
      width: (props: FileProps): number | string =>
        props.fileWidth ? props.fileWidth : "max-content",
      height: (props: FileProps): number | string =>
        props.fileHeight ? props.fileHeight : "max-content",
    },
    pdfNavigate: {
      padding: "16px",
      fontSize: primaryFonts.size.normal,
      display: "flex",
      columnGap: "8px",
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      width: "36px",
      height: "36px",
      cursor: "pointer",
      "&:hover": {
        borderRadius: "18px",
        background: primaryColor[50],
      },
      "&.disabled": {
        cursor: "auto",
        "&:hover": {
          borderRadius: "0",
          background: "none",
        },
      },
    },
    disabledIcon: {
      cursor: "auto",
      "&:hover": {
        borderRadius: "0",
        background: "none",
      },
    },
    chatbotIcon: {
      width: "100px",
      position: "fixed",
      right: "16px",
      bottom: "32px",
      zIndex: 1,
      cursor: "pointer",
    },
    chatBot: {
      borderRadius: "30px",
      background: (props: FileProps): number | string => props.openChatBot ? primaryColor[200] : 'none',
      position: "fixed",
      right: "16px",
      bottom: "16px",
      padding: "4px",
    },
    chatBotTextField: {
      padding: "12px",
    },
    inputChatBot: {
      width: "calc(100% - 100px)",
      "& > div": {
        backgroundColor: baseColor.white,
        borderRadius: '12px'
      },
    },
    chatBotBody: {
      width: "720px",
      minHeight: '80px',
      display: "flex",
      flexDirection: 'column',
      justifyContent: "end",
    },
    chatBotHistory: {
      overflow: 'auto',
      maxHeight: 'calc(100vh - 280px)',
      padding: '12px'
},
    userMessage: {
      fontSize: primaryFonts.size.normal,
      display: "flex",
      columnGap: "16px",
      alignItems: "center",
      justifyContent: "end",
    },
    userMessageIcon: {
      width: "46px",
      height: "46px",
      color: primaryColor[700],
    },
    balloonUser: {
      position: "relative",
      display: "inline-block",
      margin: "16px",
      padding: "12px",
      minWidth: 120,
      maxWidth: "100%",
      color: primaryColor[800],
      background: baseColor.lightBlue,
      borderRadius: "10px"
    },
    triangleUser: {
      position: "absolute",
      top: "50%",
      left: "100%",
      marginTop: "-10px",
      border: "10px solid transparent",
      borderLeft: `24px solid ${baseColor.lightBlue}`,
    },
    botMessage: {
      fontSize: primaryFonts.size.normal,
      display: "flex",
      columnGap: "16px",
      alignItems: "center",
    },
    botMessageIcon: {
      width: "40px",
      height: "40px",
    },
    balloonBot: {
      position: "relative",
      display: "inline-block",
      margin: "16px",
      padding: "12px",
      minWidth: 120,
      maxWidth: "100%",
      color: primaryColor[800],
      fontSize: 16,
      background: baseColor.lightGreen,
      borderRadius: "10px"
    },
    triangleBot: {
      position: "absolute",
      top: "50%",
      left: -30,
      marginTop: -10,
      border: "10px solid transparent",
      borderRight: `24px solid ${baseColor.lightGreen}`,
    },
    message:{
      whiteSpace: 'break-spaces',
      wordBreak: 'break-all'
    }
  })
);
export default useStyles;
