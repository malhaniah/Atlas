import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.GENERAL,
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Display information about the current server'),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild;
    
    if (!guild) {
      await interaction.reply({ 
        content: 'This command can only be used in a server!', 
        ephemeral: true 
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setColor(0x7289DA)
      .setTitle(`📊 ${guild.name} Server Information`)
      .setThumbnail(guild.iconURL() || '')
      .addFields(
        { name: '🆔 Server ID', value: guild.id, inline: true },
        { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
        { name: '👥 Members', value: guild.memberCount.toString(), inline: true },
        { name: '📝 Channels', value: guild.channels.cache.size.toString(), inline: true },
        { name: '😎 Roles', value: guild.roles.cache.size.toString(), inline: true },
        { name: '🎭 Emojis', value: guild.emojis.cache.size.toString(), inline: true },
        { name: '🔒 Verification Level', value: guild.verificationLevel.toString(), inline: true },
        { name: '🛡️ Boost Level', value: guild.premiumTier.toString(), inline: true }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
