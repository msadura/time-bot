import { redeemCountdown } from '@app/redeem/utils/redeemCountdown';
import { getProvider } from '@app/blockchain/provider';
import getBondsToRedeem from '@app/redeem/utils/getBondsToRedeem';
import { REDEEM_ADDRESS } from '@app/addresses';
import { redeemBonds } from '@app/redeem/utils/redeemBonds';

export async function autoRedeem() {
  if (!REDEEM_ADDRESS) {
    throw 'Redeem address is not set!';
  }

  const redeemCb = async () => {
    const bonds = await getBondsToRedeem();
    if (bonds.length) {
      await redeemBonds(bonds);
      console.log('🔥', `Bonds redeemed - ${new Date().toISOString()}`);
    }
  };

  redeemCb();

  redeemCountdown(getProvider(), redeemCb);
}
