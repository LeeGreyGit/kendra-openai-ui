import {DialogProps as MuiDialogProps} from '@material-ui/core/Dialog';
import {ReactNode} from 'react';
export interface DialogProps extends MuiDialogProps {
  title?: string;
  message?: string | ReactNode;
  okLabel?: string;
  cancelLabel?: string;
  okButton?: boolean;
  deleteButton?: boolean;
  disableOk?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}
