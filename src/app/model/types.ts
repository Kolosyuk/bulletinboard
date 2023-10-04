
export type DropDownOption = {
  [id: string]: Options[]
}

export type Options = {
  name: string;
  value: string;
}


export type AdvertDTO ={
  name: string
  description: string
  images: string[]
  cost: number
  email: string
  phone: number
  location: string
  categoryId: string
}