import { Paper } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useDragItStore } from 'Store/Helpers/useDragItStore';
import { useShowServerError } from 'Store/Helpers/useInfoError';
import { ListViewStore, ListViewStoreProvider } from './ListViewStore';
import { observer } from 'mobx-react'
import { useEffect } from 'react';
import ListViewActionFilter from './ListViewActionFilter';
import { ID } from 'rx-drag/models/baseTypes';
import { useDesign } from 'rx-drag/store/useDesign';
import { useModelStore } from 'Base/ModelTree/ModelProvider';
import { IMeta } from 'Base/RXNode/IMeta';
import { RxNode } from 'rx-drag/models/RxNode';
import useLayzyMagicPost from 'Data/useLayzyMagicPost';
import useLayzyMagicDelete from 'Data/useLayzyMagicDelete';
import { MagicQueryMeta } from '../../Data/MagicQueryMeta';
import { MagicQueryBuilder } from 'Data/MagicQueryBuilder';
import { useMagicQuery } from 'Data/useMagicQuery';
import bus from 'Base/bus';
import { EVENT_DATA_CHANGE } from 'Base/events';
import { DataChangeArg } from 'Data/DataChangeArg';
import { MagicDeleteBuilder } from 'Data/MagicDeleteBuilder';

function creatEmpertyRows(length:number){
  let rows = []
  for(var i = 0; i < length; i++){
    rows.push({id:i+1});
  }

  return rows;
}

const ListView = observer(React.forwardRef((
    props:{
      rxNode:RxNode<IMeta>,
      query?:string,
      children?:any,
      selectable?:boolean,
    }, 
    ref:any
  )=>{

  const {
    rxNode,
    query,
    children,
    selectable = true,
    ...rest
  } = props
  
  const [listViewStore] = useState(
    new ListViewStore(
      query
      ? new MagicQueryMeta(query)
      : undefined
    )
  )
  
  const appStore = useDragItStore();
  const {isDesigning} = useDesign();
  const modelStore = useModelStore();

  useEffect(()=>{
    listViewStore.setSelectable(selectable);
  },[listViewStore, selectable])

  useEffect(()=>{
    if(listViewStore.rxModel){
      const label = 'ListView' + listViewStore.rxModel?.node.id;
      listViewStore.rxModel.setLabel(label);
      modelStore?.setChild(label, listViewStore.rxModel)
    }    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[listViewStore.rxModel]);

  const builder = listViewStore.queryMeta && !isDesigning && listViewStore.paginatorInfo.pageSize > 0
    ? new MagicQueryBuilder(query)
      .setPageSize(listViewStore.paginatorInfo.pageSize)
      .setPageIndex(listViewStore.paginatorInfo.pageIndex)
      .setOrderbyMap(listViewStore.getSortMetas())
      .setWhereSql(listViewStore.toWhereSQL())
    : undefined;

  const { data, error: queryError, mutate, loading:queryLoading } = useMagicQuery<any>(
    builder, 
    {
      onComplate(){
        listViewStore.setLoading(false);
      },
      onError(){
        listViewStore.setLoading(false);
        listViewStore.setRows([]);
      }
    }
  );

  const handleDataChange = (changeArg:DataChangeArg) => {
    if(changeArg.model === listViewStore.queryMeta?.model){
      builder && mutate((data:any)=>{
        data.data = data?.data?.map((row: any) =>{
          return row.id === changeArg.data.id ? {...row, ...changeArg.data} : row;
        })
        //不加一个字段，不刷新，后面有时间再调查原因
        return {...data, _to_refresh:''} as any;
      }, true);
    }
    else{
      mutate();
    }
  }

  useEffect(()=>{
    bus?.on(EVENT_DATA_CHANGE, handleDataChange);
    return ()=>{
      bus?.off(EVENT_DATA_CHANGE, handleDataChange);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [excuteUpdate, { error:updateError }] = useLayzyMagicPost(
    {
      onCompleted:(data)=>{
        appStore.setSuccessAlert(true);
        listViewStore.setSelects([]);
        listViewStore.finishMutation();
      }
    }
  );

  const [excuteRemove, { error:removeError }] = useLayzyMagicDelete<any>(
    {
      onCompleted:(deletedData)=>{
        appStore.setSuccessAlert(true);
        listViewStore.finishMutation();
        builder && mutate((data:any)=>{
          data.data = data?.data?.filter((row: any) =>{
            return !deletedData[listViewStore.queryMeta?.model||''].find((id: any)=>row.id === id);
          })   
          //不加一个字段，不刷新，后面有时间再调查原因
          return {...data, _to_refresh:''} as any;
        }, true);
        listViewStore.setSelects([]);
      }
    }
  );

  useShowServerError(queryError||updateError||removeError);

  useEffect(()=>{
    queryLoading && !data && listViewStore.setRows(creatEmpertyRows( listViewStore.rows?.length || listViewStore.paginatorInfo.pageSize));
    queryLoading && listViewStore.setLoading(queryLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  useEffect(()=>{
    !queryLoading && listViewStore.setRows(data && query ? (data.data as any[]) : []);
    listViewStore.paginatorInfo.setQueryResult(data && query ? (data?.pagination):{}, data?.data?.length||0);      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data])

  const handelBatchRemove = ()=>{
    listViewStore.setRemovingSelects();
    const data = new MagicDeleteBuilder()
      .setModel(listViewStore.queryMeta?.model||'')
      .setIds(listViewStore.selects)
      .toData();
    excuteRemove({data});
  }

  const handleBatchUpadate = (field:string, value:any)=>{
    //if(!update){
    //  return;
    //}
    listViewStore.setUpdatingSelects(field);
    //const varilabes = update.variableName ? {[update.variableName]:{[field]:value}} : undefined;
    excuteUpdate({data:{
      ids:listViewStore.selects,
      //...varilabes,
    }})
  }

  const handleUpdate = (id:ID, field:string, value:any)=>{
    //if(!update){
    //  return;
   // }
    listViewStore.setUpdating(id, field);
    //const varilabes = update.variableName ? {[update.variableName]:{[field]:value}} : undefined;
    excuteUpdate({data:{
      ids:[id],
      //...varilabes,
    }})
  }

  const handelReomve = (id:ID)=>{
    listViewStore.setRemoving(id);
    const data = new MagicDeleteBuilder()
      .setModel(listViewStore.queryMeta?.model||'')
      .addId(id)
      .toData();

    excuteRemove({data});
  }

  return (
    <ListViewActionFilter
      onExcuteBatchRemove = {handelBatchRemove}
      onExcuteBatchUpdate = {handleBatchUpadate}
      onExcuteUpdate = {handleUpdate}
      onExcuteRemove = {handelReomve}
    >
      <ListViewStoreProvider value = {listViewStore}>
        <Paper {...rest}  ref={ref}>
          {children}
        </Paper>
      </ListViewStoreProvider>
    </ListViewActionFilter>
  );
}))

export default ListView;

