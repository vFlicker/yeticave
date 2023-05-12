import { Id, Timestamp } from '../../../common';

export interface Lot {
  id: Id;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  step: number;
  endDate: Timestamp;
  category: string;
}