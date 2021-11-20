import { secondsUntilBlock } from '@app/redeem/utils/secondsUntilBlock';
import { ethers } from 'ethers';
import { getNextRebase } from '@app/redeem/utils/getNextRebase';
import { getBlockTime } from '@app/redeem/utils/getBlockTime';

export async function getSecondsToNextRebase(provider: ethers.providers.Provider) {
  const currentTime = await getBlockTime(provider);
  const rebaseTime = await getNextRebase(provider);

  return secondsUntilBlock(currentTime, rebaseTime);
}
