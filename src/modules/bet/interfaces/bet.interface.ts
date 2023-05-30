import { Id, Timestamp } from '../../../common';

export interface Bet {
  imageUrl: string;
  title: string;
  contacts: string;
  categoryName: string;
  endDate: Timestamp;
  lotId: Id;
  price: number;
  createDate: Timestamp;
  isWinner: boolean;
}
