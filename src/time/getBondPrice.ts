import { ethers } from 'ethers';
import TimeBondDepositoryAbi from '@app/abi/TimeBondDepository.json';
import { BONDS } from '@app/addresses';
import { getProvider } from '@app/blockchain/provider';
import { BondType } from '@app/time/types';

export async function getBondPrice(bond: BondType) {
  const contract = new ethers.Contract(BONDS[bond], TimeBondDepositoryAbi, getProvider());
  try {
    const priceUSD = await contract.bondPriceInUSD();

    // console.log(
    //   `🔥 bond ${bond} price ${bond === BondType.timeAvax ? 'AVAX' : 'USD'}: `,
    //   ethers.utils.formatUnits(priceUSD as ethers.BigNumber, 'ether')
    // );

    return Number(ethers.utils.formatUnits(priceUSD as ethers.BigNumber, 'ether'));
  } catch (e) {
    console.log('🔥 getBondPrice', e);
  }
}
