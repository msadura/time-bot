import { ethers } from 'ethers';
import JoeAbi from '@app/abi/JoeRouter02.json';
import { JOE_ROUTER, TIME, WAVAX } from '@app/addresses';
import { getProvider } from '@app/blockchain/provider';

export default async function getTimePrice() {
  const router = new ethers.Contract(JOE_ROUTER, JoeAbi, getProvider());
  try {
    const out = await router.getAmountsOut(ethers.utils.parseUnits('1', 'gwei'), [TIME, WAVAX]);
    const price = out[1];
    console.log('🔥 $time price: ', ethers.utils.formatEther(out[1] as ethers.BigNumber));

    return price;
  } catch (e) {
    console.log('🔥 getTimePriceError', e);
  }
}
