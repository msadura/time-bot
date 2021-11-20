import { redeemCountdown } from '@app/redeem/utils/redeemCountdown';
import { getProvider } from '@app/blockchain/provider';

export async function autoRedeem() {
  const redeemCb = () => {
    console.log('🔥', 'trigger redeem!');
  };

  redeemCountdown(getProvider(), redeemCb);
}
