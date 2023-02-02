export interface IBasicCard {
  shipment: IShipment;
}

export interface IShipment {
  areaId: number;
  companyId: number;
  companyName: string;
  count: number;
}
