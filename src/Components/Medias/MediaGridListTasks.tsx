import React from 'react';
import {  Grid} from '@material-ui/core';
import { observer } from 'mobx-react';
import { useMediasStore } from './MediasStore';
import { MediaUploadTaskView } from './MediaUploadTaskView';

export const MediaGridListTasks = observer(()=>{
  const mediasStore = useMediasStore();
  return (
    <>
      {
        mediasStore?.tasks.map((task, index)=>{
        return (
          <Grid item key={'task' + index + '-' + task.file.name} lg={2} sm={3} xs={4}>
            <MediaUploadTaskView task = {task} />
          </Grid>
          )
        })
      }
    </>
  );
})