import useStyles from '../../common/input/styles';
import type {TextFieldProps as MuiTextFieldProps} from '@material-ui/core';
import {TextField as MuiTextField} from '@material-ui/core';
import * as React from 'react';

export interface TextFieldProps {
  maxLength?: number;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  onChange: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
}

type Prop = TextFieldProps & MuiTextFieldProps;
type ChangeEvent = React.ChangeEvent<any>;
type FocusEvent = React.FocusEvent<any>;

const TextField: React.FC<Prop> = ({
  className,
  maxLength,
  size = 'medium',
  fullWidth = true,
  onChange,
  onBlur,
  value,
  multiline,
  minRows,
  maxRows,
  disabled,
  ...props
}: Prop) => {
  const classes = useStyles();
  if (!maxLength) throw new Error('The maxLength is required!');
  const [hasOnchange, setHasOnchange] = React.useState<boolean>(false);

  const onChangeEvent = (e: ChangeEvent): void => {
    onChange(e);
    setHasOnchange(true);
  };

  const onBlurEvent = (e: FocusEvent): void => {
    hasOnchange && onBlur && onBlur(e);
    setHasOnchange(false);
  };

  const styles = className || classes.textField;

  return (
    <MuiTextField
      className={styles}
      size={size}
      value={value || ''}
      variant="outlined"
      margin="dense"
      inputProps={{
        maxLength,
      }}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      FormHelperTextProps={{classes: {root: classes.helperText}}}
      fullWidth={fullWidth}
      onChange={onChangeEvent}
      onBlur={onBlurEvent}
      disabled={disabled}
      {...props}
    />
  );
};
export default TextField;
