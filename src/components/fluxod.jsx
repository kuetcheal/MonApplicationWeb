import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

export default function Fluxod() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" component="h2">
        Posts
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"sunt aut farece repellat"}
        </DialogTitle>
        <DialogContent>
          <div className="bloc">
            <DialogActions>
              <CloseIcon onClick={handleClose} />
            </DialogActions>
          </div>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
      </Dialog>{" "}
      <TableContainer
        component={Paper}
        style={{ height: "600px", width: "801px" }}
      >
        <Table>
          <TableBody>
            {/* Première ligne */}
            <TableRow style={{ height: "100px", width: "701px" }}>
              <TableCell>
                <DialogTitle id="alert-dialog-title">
                  {"sunt aut farece repellat"}
                </DialogTitle>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Show
                </Button>
                <Button variant="contained" style={{ backgroundcolor: "red" }}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>

            {/* Deuxième ligne */}
            <TableRow style={{ height: "100px", width: "701px" }}>
              <TableCell>
                <DialogTitle id="alert-dialog-title">
                  {"sunt aut farece repellat"}
                </DialogTitle>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Open alert dialog
                </Button>
              </TableCell>
            </TableRow>

            {/* Troisième ligne */}
            <TableRow style={{ height: "100px", width: "701px" }}>
              <TableCell>
                <DialogTitle id="alert-dialog-title">
                  {"sunt aut farece repellat"}
                </DialogTitle>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending
                  anonymous location data to Google, even when no apps are
                  running.
                </DialogContentText>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Open alert dialog
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
