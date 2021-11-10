import { BondType } from '@app/time/types';
import getBondDiscount from '@app/time/getBondDiscount';
import { getTimePrice } from '@app/time/getTimePrice';

export default async function getDiscounts() {
  const tokenPrice = await getTimePrice();
  const promises = Object.values(BondType).map(bond => getBondDiscount(bond, tokenPrice));
  const res = await Promise.all(promises);

  const discounts = Object.values(BondType).map((bond, i) => ({
    bond,
    discount: res[i]
  }));

  return discounts;
}
