import { BondType } from '@app/time/types';
import { hasBond } from '@app/redeem/utils/hasBond';

export default async function getBondsToRedeem() {
  const bondsArray = Object.values(BondType);
  const promises = bondsArray.map(bond => hasBond(bond));
  const res = await Promise.all(promises);

  const redeemBonds: BondType[] = [];
  res.map((hasBond, i) => {
    if (hasBond) {
      redeemBonds.push(bondsArray[i]);
    }
  });

  return redeemBonds;
}
