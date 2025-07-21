import { SlashCommandBuilder, ChatInputCommandInteraction, SlashCommandOptionsOnlyBuilder } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
  category: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export enum CommandCategory {
  GENERAL = 'General',
  MODERATION = 'Moderation',
  FUN = 'Fun',
  UTILITY = 'Utility',
  MUSIC = 'Music'
}

export interface BotEvent {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}
