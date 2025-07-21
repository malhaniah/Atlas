# Atlas Discord Bot

A feature-rich Discord bot built with TypeScript and Discord.js v14, featuring categorized slash commands.

## 🚀 Features

- **Categorized Commands**: Commands are organized into logical categories for better management
- **Slash Commands**: Modern Discord slash command interface
- **TypeScript**: Full TypeScript support for better development experience
- **Modular Architecture**: Easy to extend and maintain
- **Error Handling**: Comprehensive error handling and logging

## 📁 Command Categories

### 🔧 General
- `/ping` - Check bot latency and response time
- `/help` - Display all available commands organized by category
- `/serverinfo` - Display information about the current server

### 🎉 Fun
- `/roll [sides]` - Roll a dice with optional number of sides
- `/8ball <question>` - Ask the magic 8-ball a question

### 🛡️ Moderation
- `/kick <user> [reason]` - Kick a member from the server
- `/clear <amount>` - Delete multiple messages from a channel

### 🔧 Utility
- `/userinfo [user]` - Display information about a user
- `/avatar [user]` - Display a user's avatar

## 🛠️ Setup

### Prerequisites
- Node.js 18.0 or higher
- A Discord Application and Bot Token

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Atlas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Discord bot credentials:
   ```env
   DISCORD_TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_discord_application_id_here
   GUILD_ID=your_discord_server_id_here
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the bot**
   ```bash
   npm start
   ```

### Development

For development with hot reload:
```bash
npm run dev
```

For watching file changes:
```bash
npm run watch
```

## 🎯 Getting Discord Bot Credentials

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to the "Bot" section and create a bot
4. Copy the bot token (this is your `DISCORD_TOKEN`)
5. Go to "General Information" and copy the Application ID (this is your `CLIENT_ID`)
6. For `GUILD_ID`, enable Developer Mode in Discord, right-click your server, and copy the ID

## 🔧 Bot Permissions

Your bot needs the following permissions:
- Send Messages
- Use Slash Commands
- Read Message History
- Manage Messages (for moderation commands)
- Kick Members (for kick command)
- Connect & Speak (if adding voice features)

## 📚 Adding New Commands

1. Create a new file in the appropriate category folder under `src/commands/`
2. Follow the command template:

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.GENERAL, // or other category
  data: new SlashCommandBuilder()
    .setName('commandname')
    .setDescription('Command description'),
    
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Hello World!');
  }
};

export default command;
```

3. The bot will automatically load the new command on restart

## 🗂️ Project Structure

```
src/
├── commands/           # Command files organized by category
│   ├── general/       # General purpose commands
│   ├── fun/           # Fun and entertainment commands
│   ├── moderation/    # Server moderation commands
│   └── utility/       # Utility commands
├── events/            # Discord.js event handlers
├── types/             # TypeScript type definitions
└── index.ts           # Main bot file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check for issues
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you need help setting up the bot or have questions, please create an issue in the repository.