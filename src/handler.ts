import './aliases';
import dotenv from 'dotenv';
dotenv.config();

import checkAndAlert from '@app/time/checkAndAlert';
import { connectProvider } from '@app/blockchain/provider';
import { initDiscord } from '@app/discord';

export async function run() {
  await connectProvider();
  try {
    initDiscord();
  } catch (e) {
    console.log('🔥 dic init e', e);
  }

  try {
    checkAndAlert();
  } catch (e) {
    console.log('🔥 check e', e);
  }
}
