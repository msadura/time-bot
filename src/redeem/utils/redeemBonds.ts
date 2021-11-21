import { TimeBondDepository } from '@app/abi';
import { BONDS, REDEEM_ADDRESS } from '@app/addresses';
import { getWallet } from '@app/blockchain/wallet';
import { BondType } from '@app/time/types';
import { ethers } from 'ethers';

const RETRIES = 3;

export async function redeemBonds(bonds: BondType[], stake = true) {
  const promises = bonds.map(bond => redeemBond(bond, stake));
  const res = await Promise.all(promises);

  return res;
}

export async function redeemBond(bond: BondType, stake = true, retryCount = 0) {
  const contract = new ethers.Contract(BONDS[bond], TimeBondDepository, getWallet());

  try {
    const tx = await contract.redeem(REDEEM_ADDRESS, stake);
    await tx.wait();

    return true;
  } catch (e) {
    console.log(`🔥 redeem fail: ${bond}`, e);

    if (retryCount < RETRIES) {
      redeemBond(bond, stake, retryCount + 1);
    }

    return false;
  }
}
