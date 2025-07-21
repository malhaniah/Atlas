import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.UTILITY,
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Display a user\'s avatar')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user whose avatar to display (defaults to you)')
        .setRequired(false)
    ),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    
    const embed = new EmbedBuilder()
      .setColor(0x9B59B6)
      .setTitle(`🖼️ ${targetUser.tag}'s Avatar`)
      .setImage(targetUser.displayAvatarURL({ size: 1024 }))
      .setDescription(`[Download Avatar](${targetUser.displayAvatarURL({ size: 1024 })})`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
