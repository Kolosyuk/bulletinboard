
export type DropDownOption = {
  [id: string]: Options[]
};

export type Options = {
  name: string;
  value: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
}