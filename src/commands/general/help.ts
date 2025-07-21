import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.GENERAL,
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Display all available commands organized by category'),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const client = interaction.client as any;
    const commands = client.commands;
    
    if (!commands) {
      await interaction.reply({ 
        content: 'No commands available!', 
        ephemeral: true 
      });
      return;
    }

    // Group commands by category
    const categories: { [key: string]: Command[] } = {};
    
    commands.forEach((command: Command) => {
      if (!categories[command.category]) {
        categories[command.category] = [];
      }
      categories[command.category].push(command);
    });

    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('🤖 Atlas Bot Commands')
      .setDescription('Here are all available commands organized by category:')
      .setTimestamp();

    // Add fields for each category
    Object.entries(categories).forEach(([category, categoryCommands]) => {
      const commandList = categoryCommands
        .map(cmd => `\`/${cmd.data.name}\` - ${cmd.data.description}`)
        .join('\n');
      
      embed.addFields({
        name: `📁 ${category}`,
        value: commandList || 'No commands in this category',
        inline: false
      });
    });

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
