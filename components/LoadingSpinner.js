import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '2rem',
    marginBottom: '2rem',
  }
}));

export default function CircularIndeterminate({ show }) {
  const classes = useStyles();

  return show ? (
    <div className={classes.root}>
      <CircularProgress color="primary" />
    </div>
  ) : null;
}