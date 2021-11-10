import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import checkAndAlert from '@app/time/checkAndAlert';
import { connectProvider } from '@app/blockchain/provider';

export async function run() {
  await connectProvider();
  checkAndAlert();
}
