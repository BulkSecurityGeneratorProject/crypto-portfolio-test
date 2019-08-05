import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';

export const enum Currency {
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  Ripple = 'Ripple'
}

export interface IEntry {
  id?: number;
  currency?: Currency;
  amount?: number;
  date?: Moment;
  wallet?: string;
  currentPrice?: number;
  user?: IUser;
}

export class Entry implements IEntry {
  constructor(
    public id?: number,
    public currency?: Currency,
    public amount?: number,
    public date?: Moment,
    public wallet?: string,
    public currentPrice?: number,
    public user?: IUser
  ) {}
}
