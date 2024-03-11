export type CarConfig = {
  configs: CarConfigDetails[] ;
  towHitch: boolean;
  yoke: boolean;
}

export type CarConfigDetails = {
  id: string,
  description: string,
  range: number,
  speed: number,
  price: number,
}
