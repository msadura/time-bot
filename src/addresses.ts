import { BondType } from '@app/time/types';

export const JOE_ROUTER = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4';
export const WAVAX = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7';
export const TIME = '0xb54f16fB19478766A268F172C9480f8da1a7c9C3';

export const BONDS: { [key in keyof typeof BondType]: string } = {
  [BondType.timeAvax]: '0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1',
  [BondType.timeMim]: '0xA184AE1A71EcAD20E822cB965b99c287590c4FFe',
  [BondType.wavax]: '0xE02B1AA2c4BE73093BE79d763fdFFC0E3cf67318',
  [BondType.mim]: '0x694738E0A438d90487b4a549b201142c1a97B556'
};
