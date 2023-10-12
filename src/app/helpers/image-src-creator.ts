import { API_BASE } from 'src/environment';

export function imageSrcCreator(id:string) : string {
  if (!id) return 'https://dummyimage.com/306x240&text=No+Image';
  let src = `${API_BASE}/images/${id}`;
  return src
}