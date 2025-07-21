import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { Command, BotEvent } from './types';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
config();

class DiscordBot {
  public client: Client;
  public commands: Collection<string, Command>;
  
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
      ]
    });
    
    this.commands = new Collection();
    
    // Add commands collection to client for easy access in events
    (this.client as any).commands = this.commands;
  }

  async loadCommands(): Promise<void> {
    const commandsPath = path.join(__dirname, 'commands');
    
    if (!fs.existsSync(commandsPath)) {
      console.log('Commands directory not found, creating...');
      return;
    }

    const categoryFolders = fs.readdirSync(commandsPath);

    for (const folder of categoryFolders) {
      const folderPath = path.join(commandsPath, folder);
      
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const commandFiles = fs.readdirSync(folderPath).filter((file: string) => 
        file.endsWith('.ts') || file.endsWith('.js')
      );

      for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        try {
          const command = require(filePath).default as Command;
          
          if ('data' in command && 'execute' in command) {
            this.commands.set(command.data.name, command);
            console.log(`✅ Loaded command: ${command.data.name} (${command.category})`);
          } else {
            console.log(`❌ Command at ${filePath} is missing required properties`);
          }
        } catch (error) {
          console.error(`❌ Error loading command ${file}:`, error);
        }
      }
    }
  }

  async loadEvents(): Promise<void> {
    const eventsPath = path.join(__dirname, 'events');
    
    if (!fs.existsSync(eventsPath)) {
      console.log('Events directory not found, creating...');
      return;
    }

    const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => 
      file.endsWith('.ts') || file.endsWith('.js')
    );

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      try {
        const event = require(filePath).default as BotEvent;
        
        if (event.once) {
          this.client.once(event.name, (...args: any[]) => event.execute(...args));
        } else {
          this.client.on(event.name, (...args: any[]) => event.execute(...args));
        }
        
        console.log(`✅ Loaded event: ${event.name}`);
      } catch (error) {
        console.error(`❌ Error loading event ${file}:`, error);
      }
    }
  }

  async registerCommands(): Promise<void> {
    const commands = Array.from(this.commands.values()).map((command: Command) => command.data.toJSON());
    
    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);
    
    try {
      console.log(`🔄 Started refreshing ${commands.length} application (/) commands.`);
      
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
        { body: commands }
      ) as any[];
      
      console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error('❌ Error registering commands:', error);
    }
  }

  async start(): Promise<void> {
    try {
      await this.loadEvents();
      await this.loadCommands();
      await this.registerCommands();
      
      await this.client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
      console.error('❌ Error starting bot:', error);
    }
  }
}

// Create and start the bot
const bot = new DiscordBot();
bot.start();
