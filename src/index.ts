import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import { connectProvider } from '@app/blockchain/provider';
import { connectWallet } from '@app/blockchain/wallet';
import { BondType, Discount } from '@app/time/types';
import getBondDiscount from '@app/time/getBondDiscount';
import getDiscounts from '@app/time/getDiscounts';

const PORT = process.env.PORT || 3002;

const INTERVAL_RATE = 30000; //ms
const MIN_ALERT_DISCOUNT = 9.0; //%

async function main() {
  await connectProvider();
  await connectWallet();

  const logDiscounts = async () => {
    const discounts = await getDiscounts();
    console.log('🔥', discounts);
  };

  const alertDiscounts = async () => {
    const discounts = await getDiscounts();
    const discountsToAlert: Discount[] = [];

    discounts.forEach(d => {
      if (d.discount && d.discount > MIN_ALERT_DISCOUNT) {
        discountsToAlert.push(d);
      }
    });

    console.log('🔥', discountsToAlert);

    if (discountsToAlert.length > 0) {
      // Trigger discord / mail alert
    }
  };

  // Uncomment to log all discounts
  // setInterval(logDiscounts, INTERVAL_RATE);

  // Uncomment to log / trigger discounts above MIN_ALERT_DISCOUNT treshold
  setInterval(alertDiscounts, INTERVAL_RATE);
  alertDiscounts();

  // const app = express();
  // app.listen(PORT, () => {
  //   console.log(`[ server ] ready on port ${PORT}`);
  // });
}

main();
