import { REST, Routes } from 'discord.js';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { Command } from './types';

// Load environment variables
config();

async function deployCommands() {
  const commands: any[] = [];
  const commandsPath = path.join(__dirname, 'commands');
  
  if (!fs.existsSync(commandsPath)) {
    console.log('❌ Commands directory not found!');
    return;
  }

  const categoryFolders = fs.readdirSync(commandsPath);

  // Load all commands
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
          commands.push(command.data.toJSON());
          console.log(`✅ Loaded command: ${command.data.name} (${command.category})`);
        }
      } catch (error) {
        console.error(`❌ Error loading command ${file}:`, error);
      }
    }
  }

  const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

  try {
    console.log(`🔄 Started refreshing ${commands.length} application (/) commands globally.`);
    
    // Deploy globally (takes up to 1 hour to update)
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID!),
      { body: commands }
    ) as any[];
    
    console.log(`✅ Successfully reloaded ${data.length} application (/) commands globally.`);
    console.log('⏰ Note: Global commands can take up to 1 hour to update across all servers.');
  } catch (error) {
    console.error('❌ Error deploying commands:', error);
  }
}

deployCommands();
