import { Timestamp } from '../../../common';

export interface CreateLot {
  title: string;
  category: string;
  description: string;
  price: number;
  step: number;
  endDate: Timestamp;
  imageUrl: string;
}
