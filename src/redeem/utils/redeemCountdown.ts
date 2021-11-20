import { REDEEM_TRIGGER } from '@app/constants';
import { getNextRebase } from '@app/redeem/utils/getNextRebase';
import { getSecondsToNextRebase } from '@app/redeem/utils/getSecondsToNextRebase';
import { ethers } from 'ethers';
import { secondsUntilBlock } from './secondsUntilBlock';

const LONG_CHECK = REDEEM_TRIGGER; // 10min;
const SHORT_CHECK = 1 * 60 * 1000; // 1min;

export async function redeemCountdown(
  provider: ethers.providers.Provider,
  triggerReedemCb: () => void
) {
  let currentTriggered = false;
  let rebaseTime = await getNextRebase(provider);

  const redeemCheck = async () => {
    const timeLeft = secondsLeftToRebase(rebaseTime * 1000);

    let timeout = LONG_CHECK;
    if (timeLeft < 0) {
      rebaseTime = await getNextRebase(provider);
      currentTriggered = false;
    }

    if (timeLeft < REDEEM_TRIGGER && !currentTriggered) {
      triggerReedemCb();
      currentTriggered = true;
    }

    if (timeLeft < LONG_CHECK * 2 && !currentTriggered) {
      console.log('🔥', 'Short check');
      timeout = SHORT_CHECK;
    }

    setTimeout(redeemCheck, timeout);
  };

  redeemCheck();
}

function secondsLeftToRebase(rebase: number, current = Date.now()) {
  return rebase - current;
}
