import { creatId } from "Base/creatId";
import { IMeta } from "Base/Model/IMeta";
import { makeAutoObservable, toJS } from "mobx";
import { IModelNode } from "./IModelNode";
import { validate } from "./validate";

export interface IFieldStore extends IModelNode{
  id:number;
  meta?:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;

  setValue: (value:any)=>void;
  setModel:(model: any)=>void;
  validate:()=>boolean;
}

export class FieldStore implements IFieldStore{
  id:number;
  meta:IMeta;
  defaultValue?: any;
  value?: any;
  error?: string;
  loading?: boolean;
  dirty?: boolean;
  constructor(meta:IMeta) {
    this.id = creatId();
    makeAutoObservable(this);
    this.meta = meta;
  }

  setLoading(loading?:boolean){
    this.loading = loading;
  }

  clearDirty(){
    this.dirty = false;
  }

  isDirty(){
    return this.dirty;
  }
  
  toFieldsGQL() {

    const gqlStr = this.meta.props?.graphiQL ? this.meta.props.graphiQL.replace('$field', this.meta?.props?.field) : this.meta?.props?.field;
    return ` ${gqlStr} `;
  }

  setModel(model: any) {
    const fieldName = this.meta.props?.field;
    const fieldValue = model && fieldName ? model[fieldName] : undefined;
    this.defaultValue = fieldValue;
    this.value = fieldValue;
  }

  setValue(value: any) {
    this.value = value;
    this.dirty = true;
  }

  getModelNode(name:string):IModelNode|undefined{
    return undefined;
  }

  toInputValue(){
    return toJS(this.value);
  }

  updateDefaultValue(){
    this.defaultValue = toJS(this.value);
  }

  validate(){
    this.error = validate(this.value, this.meta?.props?.rule);
    return !this.error;
  }

  reset(){
    this.value = this.defaultValue
    this.error = undefined;
  }

  getChildren(){
    return undefined;
  }

  setFieldStore(fieldName:string, fieldStore:IFieldStore){

  }

  getFieldStore(fieldName:string){
    return undefined;
  }
}

