import { Id } from '../../../common';

export interface CreateBet {
  userId: Id;
  lotId: Id;
  price: number;
}
