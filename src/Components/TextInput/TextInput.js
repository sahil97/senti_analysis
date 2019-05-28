import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    flexBasis: 200,
    width: "100%",
    margin: 0
  }
}));

function TextInput(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-simple-start-adornment"
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
        label="Enter a Hashtag"
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>
        }}
        onKeyDown={props.onKeyDown}
      />
    </div>
  );
}

export default TextInput;
