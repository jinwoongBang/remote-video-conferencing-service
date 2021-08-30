import React, { ReactElement } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type ModalProps = {
  open: boolean;
  onOpen: () => void;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  title: string;
  children: JSX.Element | JSX.Element[];
};

function Modal({ open, title, children, onOpen, maxWidth }: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onOpen}
      maxWidth={maxWidth}
      fullWidth={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {children}

      {/* <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOpen} color="primary">
          Disagree
        </Button>
        <Button onClick={onSubmit} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions> */}
    </Dialog>
  );
}

export default Modal;
