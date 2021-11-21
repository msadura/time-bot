import { ethers } from 'ethers';
import TimeBondDepositoryAbi from '@app/abi/TimeBondDepository.json';
import { BONDS, REDEEM_ADDRESS } from '@app/addresses';
import { getProvider } from '@app/blockchain/provider';
import { BondType } from '@app/time/types';

export async function hasBond(bond: BondType) {
  const contract = new ethers.Contract(BONDS[bond], TimeBondDepositoryAbi, getProvider());
  try {
    const info = await contract.bondInfo(REDEEM_ADDRESS);

    return Number(info.payout.toString()) > 0;
  } catch (e) {
    console.log('🔥 haasBond', e);
  }
}
