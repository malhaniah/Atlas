import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.FUN,
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a dice')
    .addIntegerOption(option =>
      option.setName('sides')
        .setDescription('Number of sides on the dice (default: 6)')
        .setMinValue(2)
        .setMaxValue(100)
        .setRequired(false)
    ),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const sides = interaction.options.getInteger('sides') || 6;
    const result = Math.floor(Math.random() * sides) + 1;
    
    const embed = new EmbedBuilder()
      .setColor(0xFF6B6B)
      .setTitle('🎲 Dice Roll')
      .setDescription(`You rolled a **${result}** on a ${sides}-sided dice!`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
