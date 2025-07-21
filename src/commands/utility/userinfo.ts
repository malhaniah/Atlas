import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.UTILITY,
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Display information about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get information about (defaults to you)')
        .setRequired(false)
    ),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const member = interaction.guild?.members.cache.get(targetUser.id);
    
    const embed = new EmbedBuilder()
      .setColor(0x3498DB)
      .setTitle(`👤 ${targetUser.tag}`)
      .setThumbnail(targetUser.displayAvatarURL({ size: 512 }))
      .addFields(
        { name: '🆔 User ID', value: targetUser.id, inline: true },
        { name: '📅 Account Created', value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`, inline: true },
        { name: '🤖 Bot', value: targetUser.bot ? 'Yes' : 'No', inline: true }
      );
    
    if (member) {
      embed.addFields(
        { name: '📥 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp! / 1000)}:F>`, inline: true },
        { name: '🎭 Nickname', value: member.nickname || 'None', inline: true },
        { name: '🎨 Roles', value: member.roles.cache.map(role => `<@&${role.id}>`).join(' ') || 'None', inline: false }
      );
    }
    
    embed.setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
