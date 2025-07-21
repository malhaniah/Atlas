import { Events, Client } from 'discord.js';
import { BotEvent } from '../types';

const event: BotEvent = {
  name: Events.ClientReady,
  once: true,
  async execute(client: Client) {
    console.log(`🚀 ${client.user?.tag} is now online!`);
    console.log(`📊 Serving ${client.guilds.cache.size} guild(s)`);
    console.log(`👥 Serving ${client.users.cache.size} user(s)`);
  }
};

export default event;
