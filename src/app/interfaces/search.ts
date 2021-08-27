import { News } from './news';
export interface Search{
  exhaustiveNbHits: boolean,
  hits:[News],
  hitsPerPage:number,
  nbHits: number,
  nbPages: number,
  page: number,
  params: string,
  processingTimeMS: number,
  query: string
}