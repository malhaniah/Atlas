import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.UTILITY,
  data: new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('Generate a Discord timestamp')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('Time (e.g., "2024-12-25 15:30", "in 2 hours", "tomorrow")')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('format')
        .setDescription('Timestamp format')
        .setRequired(false)
        .addChoices(
          { name: 'Short Time (16:20)', value: 't' },
          { name: 'Long Time (4:20:30 PM)', value: 'T' },
          { name: 'Short Date (20/04/2021)', value: 'd' },
          { name: 'Long Date (20 April 2021)', value: 'D' },
          { name: 'Short Date/Time (20 April 2021 16:20)', value: 'f' },
          { name: 'Long Date/Time (Tuesday, 20 April 2021 4:20 PM)', value: 'F' },
          { name: 'Relative Time (2 months ago)', value: 'R' }
        )
    ),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const timeInput = interaction.options.getString('time');
    const format = interaction.options.getString('format') || 'f';
    
    let timestamp: number;
    
    if (!timeInput) {
      timestamp = Math.floor(Date.now() / 1000);
    } else {
      const parsed = Date.parse(timeInput);
      if (isNaN(parsed)) {
        await interaction.reply({ 
          content: 'Invalid time format! Try something like "2024-12-25 15:30" or "tomorrow"', 
          ephemeral: true 
        });
        return;
      }
      timestamp = Math.floor(parsed / 1000);
    }
    
    const discordTimestamp = `<t:${timestamp}:${format}>`;
    const code = `\`<t:${timestamp}:${format}>\``;
    
    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('⏰ Discord Timestamp')
      .addFields(
        { name: 'Preview', value: discordTimestamp, inline: true },
        { name: 'Code', value: code, inline: true },
        { name: 'Unix Timestamp', value: timestamp.toString(), inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
