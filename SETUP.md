# 🚀 Quick Start Guide for Atlas Discord Bot

## Step 1: Set up Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to "Bot" section in the left sidebar
4. Click "Add Bot"
5. Copy the token (you'll need this for `.env`)
6. Under "Privileged Gateway Intents", enable:
   - Server Members Intent
   - Message Content Intent

## Step 2: Invite Bot to Server

1. Go to "OAuth2" > "URL Generator"
2. Select scopes: `bot` and `applications.commands`
3. Select bot permissions:
   - Send Messages
   - Use Slash Commands
   - Read Message History
   - Manage Messages
   - Kick Members
   - Connect
   - Speak
4. Copy the generated URL and visit it to invite the bot

## Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your bot credentials:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_application_id_here
   GUILD_ID=your_server_id_here
   ```

**How to get these values:**
- `DISCORD_TOKEN`: From Bot section in Discord Developer Portal
- `CLIENT_ID`: From General Information section (Application ID)
- `GUILD_ID`: Enable Developer Mode in Discord, right-click your server, "Copy Server ID"

## Step 4: Install and Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy commands (first time only):**
   ```bash
   npm run deploy
   ```

4. **Start the bot:**
   ```bash
   npm start
   ```

## Development Commands

- `npm run dev` - Run in development mode with hot reload
- `npm run watch` - Watch for file changes and restart
- `npm run lint` - Check code for issues
- `npm run lint:fix` - Fix linting issues automatically

## Available Bot Commands

Once running, your bot will have these commands:

### General Commands
- `/ping` - Check bot latency
- `/help` - Show all commands
- `/serverinfo` - Display server information

### Fun Commands  
- `/roll [sides]` - Roll a dice
- `/8ball <question>` - Ask magic 8-ball

### Moderation Commands
- `/kick <user> [reason]` - Kick a member
- `/clear <amount>` - Delete messages

### Utility Commands
- `/userinfo [user]` - Show user information
- `/avatar [user]` - Display user avatar

## Troubleshooting

**Bot doesn't respond to commands:**
- Make sure the bot is online and in your server
- Check that commands are deployed (`npm run deploy`)
- Verify bot has necessary permissions

**Command deployment issues:**
- Double-check your `.env` file has correct values
- Ensure your bot token is valid
- Make sure CLIENT_ID matches your application

**Permission errors:**
- Verify bot role is high enough in server hierarchy
- Check that bot has required permissions for each command

## Need Help?

Create an issue in the repository if you encounter any problems!
