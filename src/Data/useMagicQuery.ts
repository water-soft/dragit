import  { SWRResponse } from "swr";
import { DataError } from "./DataError";
import { MagicQuery } from "./MagicQuery";
import { useSWRQuery } from "./useSWRQuery";

export function useMagicQuery<T>(queryMeta:MagicQuery):SWRResponse<{data:T}, DataError>&{loading?:boolean}{

  const rt = useSWRQuery<{data:T}>(queryMeta.toAxioConfig());

  return rt;
}