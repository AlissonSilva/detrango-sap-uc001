
export interface ItemResponse {
  content: Item[];
  totalElements: number;
}

export interface Item {
  id: number,
  descricao: string;
  tipo: string;
}
