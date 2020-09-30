import React, { Fragment } from 'react';
import { makeStyles, Theme, createStyles, TextField, FormControlLabel, Switch, Checkbox} from '@material-ui/core';
import { InputProps } from './InputProps';
import intl from 'react-intl-universal';
import MetaListDialog from './MetaListDialog';

const styles = (theme: Theme) =>
  createStyles({
    itemInput:{
      margin: theme.spacing(1),
    },

    jumpCheckbox:{
      margin: theme.spacing(-0.2),
    }
    
  });

const useStyles = makeStyles(styles);

export default function ListViewCommandDialog(props:InputProps){
  const classes = useStyles();
  const {field, value, onChange} = props;
  const [filters, setFilters] = React.useState(value ? JSON.parse(JSON.stringify(value)) : []);
  const [selectedIndex, setSelectedIndex] = React.useState(filters.length > 0 ? 0 : -1);

  const handleChangeAttribute = (index:number, name:string, value:string|boolean)=>{
    filters[selectedIndex][name] = value;
    setFilters([...filters]);
  };


  const handleAddNew = ()=>{
    filters.push({slug:'new-action', label:'New Action', props:{}});
    setSelectedIndex(filters.length - 1);
  };
  
  return (
    <MetaListDialog
      title ={intl.get('action-editor')}
      value = {filters}
      selectedIndex = {selectedIndex}
      onAddNew = {handleAddNew}
      onChange = {newValue=>{setFilters(newValue)}}
      onSave = {()=>{onChange(field, JSON.parse(JSON.stringify(filters)))}}
      onSelected = {index=>{setSelectedIndex(index)}}
    >{selectedIndex >= 0 &&
        <Fragment>
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('slug')}
            variant="outlined" 
            fullWidth
            value = {filters[selectedIndex].slug || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'slug', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('name')} 
            variant="outlined" 
            fullWidth
            value = {filters[selectedIndex].label || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'label', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('action-icon')} 
            variant="outlined" 
            fullWidth
            value = {filters[selectedIndex].icon || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'icon', event.target.value.trim())
            }}
          />
          <FormControlLabel
            className = {classes.jumpCheckbox}
            control={
              <Checkbox
                color="primary"
                checked = {false}
                onChange = {event=>{
                  //handleChangeAttribute(selectedIndex, 'sortable', event.target.checked)
                }}                        
              />
            }
            label={intl.get('jump-to')}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('module-id')} 
            variant="outlined" 
            fullWidth
            value = {filters[selectedIndex].moduleId || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'icon', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('page-id')} 
            variant="outlined" 
            fullWidth
            value = {filters[selectedIndex].pageId || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'icon', event.target.value.trim())
            }}
          />
          <TextField 
            className = {classes.itemInput} 
            label={intl.get('param-field')} 
            variant="outlined" 
            fullWidth
            value = {filters[selectedIndex].paramField || ''} 
            onChange = {event=>{
              handleChangeAttribute(selectedIndex, 'icon', event.target.value.trim())
            }}
          />
        </Fragment>
      }
    </MetaListDialog>
    
  )
}