import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import { connectProvider } from '@app/blockchain/provider';
import { connectWallet } from '@app/blockchain/wallet';
import { initDiscord } from '@app/discord';
import { INTERVAL_RATE } from '@app/constants';
import checkAndAlert from '@app/time/checkAndAlert';
import { autoRedeem } from '@app/redeem/autoRedeem';

async function main() {
  await connectProvider();
  await connectWallet();

  // Uncomment to log / trigger discounts above MIN_ALERT_DISCOUNT treshold
  setInterval(checkAndAlert, INTERVAL_RATE);
  initDiscord();

  autoRedeem();
}

main();
