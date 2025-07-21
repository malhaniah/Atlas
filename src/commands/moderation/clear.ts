import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.MODERATION,
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete multiple messages from a channel')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger('amount', true);
    
    if (!interaction.channel || !interaction.channel.isTextBased() || interaction.channel.isDMBased()) {
      await interaction.reply({ 
        content: 'This command can only be used in server text channels!', 
        ephemeral: true 
      });
      return;
    }
    
    try {
      const messages = await (interaction.channel as any).bulkDelete(amount, true);
      
      const embed = new EmbedBuilder()
        .setColor(0xF39C12)
        .setTitle('🧹 Messages Cleared')
        .setDescription(`Successfully deleted ${messages.size} message(s)`)
        .addFields(
          { name: '👮 Moderator', value: interaction.user.tag, inline: true },
          { name: '📍 Channel', value: `<#${interaction.channelId}>`, inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      await interaction.reply({ 
        content: 'Failed to delete messages! Messages might be older than 14 days.', 
        ephemeral: true 
      });
    }
  }
};

export default command;
