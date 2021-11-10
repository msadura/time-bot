import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import { connectProvider } from '@app/blockchain/provider';
import { connectWallet } from '@app/blockchain/wallet';
import { Discount } from '@app/time/types';
import getDiscounts from '@app/time/getDiscounts';
import { initDiscord, sendMessage } from '@app/discord';
import { INTERVAL_RATE, MIN_ALERT_DISCOUNT } from '@app/constants';
import checkAndAlert from '@app/time/checkAndAlert';

async function main() {
  await connectProvider();
  await connectWallet();

  const logDiscounts = async () => {
    const discounts = await getDiscounts();
    console.log('🔥', discounts);
  };

  // Uncomment to log all discounts
  // setInterval(logDiscounts, INTERVAL_RATE);
  // logDiscounts();
  // Uncomment to log / trigger discounts above MIN_ALERT_DISCOUNT treshold
  setInterval(checkAndAlert, INTERVAL_RATE);
  // alertDiscounts();

  // const app = express();
  // app.listen(PORT, () => {
  //   console.log(`[ server ] ready on port ${PORT}`);
  // });

  initDiscord();
}

main();
