export interface IMultipleSelect {
  label: string;
  setSelectedValues?: (item: any) => void;
  selectedValues: number[] | string[];
  options: IArea[] | string[];
}

export interface IArea {
  area: string;
  id: number;
  label: string;
}

export interface ICompanyArea {
  companyName: string;
  companyId: number;
  areaId: number;
  count: number;
}
