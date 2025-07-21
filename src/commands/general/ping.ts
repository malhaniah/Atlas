import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { Command, CommandCategory } from '../../types';

const command: Command = {
  category: CommandCategory.GENERAL,
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot\'s latency and response time'),
    
  async execute(interaction: ChatInputCommandInteraction) {
    const sent = await interaction.reply({ 
      content: 'Pinging...', 
      fetchReply: true 
    });
    
    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🏓 Pong!')
      .addFields(
        { 
          name: 'Latency', 
          value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`, 
          inline: true 
        },
        { 
          name: 'API Latency', 
          value: `${Math.round(interaction.client.ws.ping)}ms`, 
          inline: true 
        }
      )
      .setTimestamp();

    await interaction.editReply({ content: '', embeds: [embed] });
  }
};

export default command;
