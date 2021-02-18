import { makeAutoObservable } from "mobx";

export class MediaUploadTask{
  file:File; 
  errorMessage?:string;
  uploading:boolean = false;
  constructor(file:File) {
    this.file = file;
    makeAutoObservable(this)
  }

  get thumbnailUrl(){
    return URL.createObjectURL(this.file);
  }

  setUploading(uploading:boolean){
    this.uploading = uploading;
  }

  setErrorMessage(errorMessage?:string){
    this.errorMessage = errorMessage;
  }
}

