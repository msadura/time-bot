import { ethers } from 'ethers';
export enum BondType {
  timeAvax = 'timeAvax',
  timeMim = 'timeMim',
  wavax = 'wavax',
  mim = 'mim'
}

export type Token = {
  address: string;
  decimals: number;
};

export type TokenPrice = {
  avax: number;
  usd: number;
};

export enum PriceType {
  buy = 'buy',
  sell = 'sell'
}
