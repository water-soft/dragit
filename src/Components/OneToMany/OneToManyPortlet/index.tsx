import React, { useEffect} from 'react';
import { makeStyles, Theme, createStyles, Grid, Divider, IconButton } from '@material-ui/core';
import MultiContentPotlet from 'Components/Common/MultiContentPotlet';
import { fade } from '@material-ui/core/styles/colorManipulator';
import CloseIcon from '@material-ui/icons/Close';
import { ModelProvider, useModelStore } from 'Base/ModelTree/ModelProvider';
import { useDesign } from 'Design/PageEditor/useDesign';
import { RXModel } from 'Base/ModelTree/RXModel';
import { makeTableModel, makeTableRowModel } from 'Base/ModelTree/makeTableModel';
import { ID } from 'Base/Model/graphqlTypes';
import { observer } from 'mobx-react';
import { DADA_RXID_CONST } from 'Base/RXNode/RXNode';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },

    itemToolbar:{
      padding:theme.spacing(1, 2.2),
      fontWeight:'bold',
      backgroundColor: fade(theme.palette.secondary.main, 0.04),
      alignItems:"center",
    },
    storeBuilder:{
      display:'none',
    }
  }),
);

const OneToManyPortlet = observer(React.forwardRef((
  props: any,
  ref:any
)=>{
  const {loading, rxNode, value, title, children, ...rest} = props;
  const {isDesigning} = useDesign();
  const classes = useStyles();
  const modelStore =  useModelStore();
  const fieldStore = modelStore?.getChild(rxNode?.meta.field);
  useEffect(()=>{
    const field = rxNode?.meta.field;
    if(rxNode && field){
      const model = new RXModel(rxNode, field);
      modelStore?.setChild(field, model);
      return ()=>{
        modelStore?.removeChildStore(field);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rxNode])

  useEffect(()=>{
    makeTableModel(fieldStore?.value, fieldStore, rxNode, 'OneToManyPortletRow');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fieldStore?.value])

  //const fieldStoreForDesign = useMemo(()=>{
  //  if(isDesigning){
      //const store = new RXNode()
      //store.addRow()
  //    return store;      
  //  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  //},[isDesigning]);


  const handleAddNew = ()=>{
    if(isDesigning){
      return;
    }
    makeTableRowModel(fieldStore?.value,  fieldStore, rxNode, 'OneToManyPortletRow')
  }

  const handelRemove = (id:ID)=>{
    console.log('handelRemove', id);
    fieldStore?.removeChildStore(id);
    //fieldStore?.removeRow(index);
  }

  //const store = isDesigning ? fieldStoreForDesign : fieldStore;

  return (
    <MultiContentPotlet title={title} ref={ref} {...rest} {...{[DADA_RXID_CONST]:fieldStore?.node?.rxid}}
      onAddNew = {handleAddNew}
    >
      <div className = {classes.storeBuilder}>{/*
        <ModelProvider value = {fieldStore?.schemaRow}>
          {children}
      </ModelProvider>*/}
      </div>
      {
        fieldStore?.getChildren()?.map((rowStore, index)=>{
          return(
            <ModelProvider value={rowStore} key = {rowStore.id}>
              <Grid container >
                <Grid container item xs={12} justify = "space-between" className={classes.itemToolbar}>
                  <Grid item>{title} #{index + 1}</Grid>
                  <Grid item>
                    <IconButton aria-label="delete"
                      onClick = {(event) => {handelRemove(rowStore.id)}}
                      size="small"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item xs={12} {...{[DADA_RXID_CONST]:rxNode?.rxid}}>
                  <Divider />
                  {children}
                </Grid>
              </Grid>
            </ModelProvider>            
          )
        })
      }

    </MultiContentPotlet>
  )
}))

export default OneToManyPortlet