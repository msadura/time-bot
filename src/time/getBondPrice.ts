import { ethers } from 'ethers';
import TimeBondDepositoryAbi from '@app/abi/TimeBondDepository.json';
import { BONDS } from '@app/addresses';
import { getProvider } from '@app/blockchain/provider';
import { BondType } from '@app/time/types';

export default async function getBondPrice(bond: BondType) {
  const contract = new ethers.Contract(BONDS[bond], TimeBondDepositoryAbi, getProvider());
  try {
    const price = await contract.bondPrice();
    const priceUSD = await contract.bondPriceInUSD();
    console.log(
      `🔥 bond ${bond} price: `,
      ethers.utils.formatUnits(price as ethers.BigNumber, 'wei')
    );

    console.log(
      `🔥 bond ${bond} price USD: `,
      ethers.utils.formatUnits(priceUSD as ethers.BigNumber, 'ether')
    );

    return price;
  } catch (e) {
    console.log('🔥 getTimePriceError', e);
  }
}
