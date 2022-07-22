import Discord, { Intents, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { v4 as uuidv4 } from "uuid";

class MasterBot
{
    constructor({ token, textChannelId, bots }) {
        this.client = new Discord.Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });

        this.token = token;
        this.textChannelId = textChannelId;
        this.bots = bots;

        this.initialise();
    }


    startCommand = (data) => {
        this.bots.forEach((bot) => bot.startCommand(data));
    }

    stopCommand = (data) => {
        this.bots.forEach((bot) => bot.stopCommand(data));
    }

    initialise = () => {
        this.client.login(this.token)
            .catch(console.error)
        ;

        this.client.once('ready', () => {
            this.client.guilds.cache.forEach(async (guild) => {
                const channel = guild.channels.cache.get(this.textChannelId);
                if (channel instanceof TextChannel) {
                    const startButton = new MessageButton({
                        customId: uuidv4(),
                        label: 'Start all bots',
                        style: 'SUCCESS',
                        emoji: '⌚'
                    });

                    const stopButton = new MessageButton({
                        customId: uuidv4(),
                        label: 'Stop all bots',
                        style: 'DANGER',
                        emoji: '✋'
                    });

                    await channel.bulkDelete(
                        (await channel.messages.fetch()).filter(({ author: { id } }) => id === this.client.application.id),
                        true
                    );

                    await channel.send({
                        components: [
                            new MessageActionRow().addComponents([
                                startButton,
                                stopButton
                            ])
                        ]
                    });

                    const collector = channel.createMessageComponentCollector();
                    collector.on('collect', (interaction) => {
                        const { componentType, customId } = interaction;

                        if (componentType === 'BUTTON') {
                            switch (customId) {
                                case startButton.customId:
                                    this.startCommand(interaction);
                                    interaction.deferUpdate()
                                    break;
                                case stopButton.customId:
                                    this.stopCommand(interaction);
                                    interaction.deferUpdate()
                                    break;
                            }
                        }
                    })
                }
            })
        });
    }
}

export default MasterBot;