import { BondType, TokenPrice } from '@app/time/types';
import { getTimePrice } from '@app/time/getTimePrice';
import { getBondPrice } from '@app/time/getBondPrice';

export default async function getBondDiscount(bond: BondType, timePrice: TokenPrice | null) {
  const tokenPrice = timePrice || (await getTimePrice());
  const bondPrice = await getBondPrice(bond);
  let discount: number | null = null;

  if (!tokenPrice || !bondPrice) {
    return;
  }

  if (bond === BondType.timeAvax) {
    discount = (tokenPrice.avax / bondPrice - 1) * 100;
  } else {
    discount = (tokenPrice.usd / bondPrice - 1) * 100;
  }

  return discount;
}
