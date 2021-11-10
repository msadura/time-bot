import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import { connectProvider } from '@app/blockchain/provider';
import { connectWallet } from '@app/blockchain/wallet';
import { BondType } from '@app/time/types';
import getBondDiscount from '@app/time/getBondDiscount';

const PORT = process.env.PORT || 3002;

async function main() {
  await connectProvider();
  await connectWallet();
  const discount = await getBondDiscount(BondType.timeMim);
  console.log('🔥', discount);
  // const app = express();
  // app.listen(PORT, () => {
  //   console.log(`[ server ] ready on port ${PORT}`);
  // });
}

main();
