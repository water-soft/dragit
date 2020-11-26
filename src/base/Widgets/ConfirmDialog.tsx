import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position:'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%',
    },

  }),
);

export default function ConfirmDialog(){
  const classes = useStyles();
  return (
    <div>      
    </div>
  )
}
