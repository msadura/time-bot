import { StakingContract } from '@app/abi';
import { STAKING_ADDRESS } from '@app/addresses';
import { ethers } from 'ethers';

export async function getNextRebase(provider: ethers.providers.Provider) {
  const stakingContract = new ethers.Contract(STAKING_ADDRESS, StakingContract, provider);
  const epoch = await stakingContract.epoch();
  const nextRebase = epoch.endTime as number;

  return nextRebase;
}
