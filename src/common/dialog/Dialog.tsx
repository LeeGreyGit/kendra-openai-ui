import React, { ReactNode, ReactElement } from "react";
import Button from "@material-ui/core/Button";
import { Dialog as MuiDialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogProps } from "../../common/dialog/interface";
import { useTranslation } from "react-i18next";
import { DialogContentText } from "@material-ui/core";
import useStyles from "../../common/dialog/styles";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";

const Dialog = ({
  title,
  message,
  okLabel,
  cancelLabel,
  okButton,
  deleteButton,
  disableOk,
  onCancel,
  onSave,
  onDelete,
  onClose,
  ...props
}: DialogProps): ReactElement<ReactNode> => {
  const disableOkBtn = disableOk || false;
  const classes = useStyles();
  const { t } = useTranslation();
  const handleClose = (): void => {
    onCancel && onCancel();
  };

  return (
    <div>
      <MuiDialog
        {...props}
        className={classes.dialog}
        maxWidth={props.maxWidth ?? "lg"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {title && (
          <DialogTitle id="alert-dialog-title" className={classes.title}>
            {title}
            {onClose && (
              <Tooltip title={t("close")}>
                <CloseIcon
                  onClick={handleClose}
                  className={classes.closeIcon}
                />
              </Tooltip>
            )}
          </DialogTitle>
        )}
        <DialogContent className={classes.message}>
          {message && React.isValidElement(message) ? (
            message
          ) : (
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          )}
        </DialogContent>
        {!onClose && (
          <DialogActions
            className={clsx(classes.footer, {
              [classes.spaceBetween]: deleteButton,
            })}
          >
            {deleteButton && (
              <Button
                onClick={onDelete}
                variant="contained"
                color={"secondary"}
                className={classes.button}
              >
                {t("words.delete")}
              </Button>
            )}
            <div className={classes.rightButton}>
              {okButton ? (
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  color="primary"
                  disabled={disableOkBtn}
                  className={classes.button}
                >
                  {t("words.ok")}
                </Button>
              ) : (
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  className={classes.button}
                >
                  {cancelLabel || t("words.cancel")}
                </Button>
              )}

              {onSave && (
                <Button
                  onClick={onSave}
                  variant="contained"
                  color={"primary"}
                  disabled={disableOkBtn}
                  className={classes.button}
                >
                  {okLabel}
                </Button>
              )}
            </div>
          </DialogActions>
        )}
      </MuiDialog>
    </div>
  );
};

export default Dialog;
