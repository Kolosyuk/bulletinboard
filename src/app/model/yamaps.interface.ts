export interface GeocoderResponseMetaData {
  request: string
  found: string
  results: string
  Point: Point
}

export interface Point {
  pos: string
}