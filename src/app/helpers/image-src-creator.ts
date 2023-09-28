export function imageSrcCreator(base64:string) : string {
  let src = `data:image/jpg;base64,${base64}`;
  return src
}