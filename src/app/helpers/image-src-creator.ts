import { API_BASE } from 'src/environment';

export function imageSrcCreator(id: string = ''): string {
  if (!id) return '/assets/no-image.png';
  let src = `${API_BASE}/images/${id}`;
  return src;
};