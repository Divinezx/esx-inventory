import React, {
  ChangeEvent,
  createContext,
  ReactEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Theme
} from "@material-ui/core";
import { InventoryTheme } from "../styles/theme";

interface InputDialogProps {
  title: string;
  placeholder: string;
  type: string
  onSubmit: (inputValue: string) => void;
}

interface DialogProviderContext {
  openDialog: (dialogProps: InputDialogProps) => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
}

const defaultDialogState = {
  description: "This is the default description for whatever",
  placeholder: "This is the default placeholder...",
  type: "number",
  onSubmit: () => {},
  title: "Dialog Title",
};

const DialogContext = createContext<DialogProviderContext>({openDialog: (defaultDialogState) => {}, closeDialog: (() => {}), isDialogOpen: false});

const useStyles = makeStyles((theme: Theme) => ({
  dialog: {
    background: theme.inventory.backgroundColor
  },
  dialogTitle: {
    paddingBottom: '5px',
    color: theme.inventory.textColor,
  },
  input: {

    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none"
    }
  }
}));



export const DialogProvider: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = InventoryTheme;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState<InputDialogProps>(
    defaultDialogState
  );
  const [dialogInputVal, setDialogInputVal] = useState<string>("");


  const handleDialogSubmit = () => {
    if (!dialogInputVal.trim()) {
      return ;
    }

    dialogProps.onSubmit(dialogInputVal);
    setDialogOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDialogInputVal(e.target.value);
  };

  const openDialog = useCallback((dialogProps: InputDialogProps) => {
    setDialogProps(dialogProps);
    setDialogOpen(true);
  }, []);

  const handleOnClick: ReactEventHandler<{}> = useCallback((e) => {
    e.stopPropagation();
    handleDialogClose();
  }, []);

  const handleDialogClose: () => void = () => {
    setDialogOpen(false);
  };

  // We reset default state after the animation is complete
  const handleOnExited = () => {
    setDialogProps(defaultDialogState);
  };

  return (
    <DialogContext.Provider
      value={{
        openDialog,
        closeDialog: handleDialogClose,
        isDialogOpen: dialogOpen,
      }}
    >
      <Dialog
        onEscapeKeyDown={handleDialogClose}
        open={dialogOpen}
        onExited={handleOnExited}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDialogSubmit();
          }}
          className={classes.dialog}
        >
          <DialogTitle classes={{ root: classes.dialogTitle }}>
            {dialogProps.title}
          </DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              type={dialogProps.type}
              autoFocus
              fullWidth
              id="dialog-input"
              placeholder={dialogProps.placeholder}
              onChange={handleChange}
              className={classes.input}
              autoComplete="off"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnClick}>
              {"Cancel"}
            </Button>
            <Button type="submit" style={{
                color: theme.inventory.secondaryTextColor,
              }}>
              {"Submit"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () =>
  useContext<DialogProviderContext>(DialogContext);
