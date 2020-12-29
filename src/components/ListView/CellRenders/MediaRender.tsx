import { IMedia } from 'base/Model/IMedia';
import React from 'react';
import Image from 'components/common/Image';
import noImage from 'assets/img/no-image.png';

export const MediaRender = React.forwardRef((
  props:{
    value:IMedia,
    width:number,
  },
  ref:any
) =>{
  const {value, width = 60, ...rest} = props;
  return(
    <div style={{width:width ? width + 'px' :''}} {...rest}>
      <Image src={value?.thumbnail || noImage} />      
    </div>

  )
})