import {
  DISCORD_BOT_TOKEN,
  DISCORD_CHANNEL_ID,
  INTERVAL_RATE,
  MIN_ALERT_DISCOUNT
} from '@app/constants';
import { Client } from 'discord.js';

const client = new Client();
let isReady = false;

export async function initDiscord() {
  client.once('ready', () => {
    isReady = true;

    sendMessage(`
    --- Time alert server connected ---
         Check interval: ${INTERVAL_RATE / 1000}s
         Minimum discount threshold: ${MIN_ALERT_DISCOUNT}%
    --- GL ---`);
  });

  client.login(DISCORD_BOT_TOKEN);
}

export async function sendMessage(message: string, channelId: string = DISCORD_CHANNEL_ID) {
  const channel = client.channels.cache.get(channelId);
  if (!isReady) {
    return;
  }

  if (channel?.isText()) {
    try {
      await channel.send(message);
    } catch (e: any) {
      console.log('🔥', 'Message failed to send', e.message);
    }
  }
}
