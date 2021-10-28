import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import { connectProvider } from '@app/blockchain/provider';
import { connectWallet } from '@app/blockchain/wallet';
import getTimePrice from '@app/time/getTimePrice';
import getBondPrice from '@app/time/getBondPrice';
import { BondType } from '@app/time/types';

const PORT = process.env.PORT || 3002;

async function main() {
  await connectProvider();
  await connectWallet();
  getTimePrice();
  getBondPrice(BondType.timeAvax);
  // const app = express();
  // app.listen(PORT, () => {
  //   console.log(`[ server ] ready on port ${PORT}`);
  // });
}

main();
