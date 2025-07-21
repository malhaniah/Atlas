import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.FUN,
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a question')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Your question for the magic 8-ball')
        .setRequired(true)
    ),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const question = interaction.options.getString('question', true);
    
    const responses = [
      'It is certain', 'Reply hazy, try again', 'Don\'t count on it',
      'It is decidedly so', 'Ask again later', 'My reply is no',
      'Without a doubt', 'Better not tell you now', 'My sources say no',
      'Yes definitely', 'Cannot predict now', 'Outlook not so good',
      'You may rely on it', 'Concentrate and ask again', 'Very doubtful',
      'As I see it, yes', 'Most likely', 'Outlook good',
      'Yes', 'Signs point to yes'
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    const embed = new EmbedBuilder()
      .setColor(0x8E44AD)
      .setTitle('🎱 Magic 8-Ball')
      .addFields(
        { name: '❓ Question', value: question, inline: false },
        { name: '🔮 Answer', value: response, inline: false }
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};

export default command;
