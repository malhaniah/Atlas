import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.FUN,
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flip a coin - heads or tails!'),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const emoji = result === 'Heads' ? '🪙' : '🔘';
    
    const embed = new EmbedBuilder()
      .setColor(result === 'Heads' ? 0xFFD700 : 0x87CEEB)
      .setTitle(`${emoji} Coin Flip`)
      .setDescription(`The coin landed on **${result}**!`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
