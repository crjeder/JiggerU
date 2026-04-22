import React from "react";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  IconButton,
  Button,
} from "@mui/material";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { closeFilterDialog } from "../../actions";
import CloseIcon from "@mui/icons-material/Close";
import { dialogFor, labelFor } from "../../filterConfig";

const FilterDialog = ({
  closeFilterDialog,
  filterOptions: { activeDialog },
}) => {
  function handleCloseDialog() {
    closeFilterDialog();
  }
  const DialogContentComponent = dialogFor(activeDialog);

  return (
    <Dialog
      open={!!activeDialog}
      fullWidth={true}
      onClose={handleCloseDialog}
      aria-labelledby="simple-dialog-title"
    >
      <>
        <DialogTitle id="simple-dialog-title">
          <IconButton
            aria-label="Close"
            sx={{
              position: "absolute",
              right: (theme) => theme.spacing(1),
              top: (theme) => theme.spacing(1),
              color: (theme) => theme.palette.grey[500],
            }}
            onClick={handleCloseDialog}
          >
            <CloseIcon />
          </IconButton>
          {labelFor(activeDialog)}
        </DialogTitle>
        {DialogContentComponent && <DialogContentComponent />}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  filterOptions: state.filterOptions,
});

const mapDispatchToProps = (dispatch) => ({
  closeFilterDialog: bindActionCreators(closeFilterDialog, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialog);
