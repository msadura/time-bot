import { DISCORD_BOT_TOKEN, DISCORD_CHANNEL_ID, MIN_ALERT_DISCOUNT } from '@app/constants';
import { Client, Intents } from 'discord.js';
import { INTERVAL_RATE } from '../constants';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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
      await (channel as any).send(message);
    } catch (e: any) {
      console.log('🔥', 'Message failed to send', e.message);
    }
  }
}
