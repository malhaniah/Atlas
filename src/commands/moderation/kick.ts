import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.MODERATION,
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = interaction.guild?.members.cache.get(targetUser.id);
    
    if (!member) {
      await interaction.reply({ 
        content: 'User not found in this server!', 
        ephemeral: true 
      });
      return;
    }
    
    if (!member.kickable) {
      await interaction.reply({ 
        content: 'I cannot kick this user!', 
        ephemeral: true 
      });
      return;
    }
    
    try {
      await member.kick(reason);
      
      const embed = new EmbedBuilder()
        .setColor(0xE74C3C)
        .setTitle('👢 Member Kicked')
        .addFields(
          { name: '👤 User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: '👮 Moderator', value: interaction.user.tag, inline: true },
          { name: '📝 Reason', value: reason, inline: false }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      await interaction.reply({ 
        content: 'Failed to kick the user!', 
        ephemeral: true 
      });
    }
  }
};

export default command;
