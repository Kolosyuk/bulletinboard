import { API_BASE } from 'src/environment';

export function imageSrcCreator(id:string) : string {
  let src = `${API_BASE}/images/${id}`;
  return src
}