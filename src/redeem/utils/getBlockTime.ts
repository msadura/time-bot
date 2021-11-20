import { ethers } from 'ethers';

export async function getBlockTime(provider: ethers.providers.Provider) {
  const currentBlock = await provider.getBlockNumber();
  const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;

  return currentBlockTime as number;
}
