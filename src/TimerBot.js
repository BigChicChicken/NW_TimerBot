import path from "path";
import fs from "fs";
import Discord, { Intents, MessageActionRow, MessageButton, TextChannel } from "discord.js";
import { v4 as uuidv4 } from "uuid";
import logger from "./Logger.js";
import { AUDIO, RESPAWN } from "./config.js";
import { createRequire } from "module";

const {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    VoiceConnectionStatus,
    NoSubscriberBehavior
} = createRequire(import.meta.url)("@discordjs/voice");

class TimerBot
{
    static EXTRA_SPEACH = 859;

    constructor({ name, lang, token, voiceChannelId, textChannelId }) {
        this.ID = uuidv4();
        this.client = new Discord.Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play
            }
        });
        this.connection = null;
        this.interval = null;

        this.audio = AUDIO(lang);

        this.token = token;
        this.voiceChannelId = voiceChannelId;
        this.textChannelId = textChannelId;

        this.logger = logger(`${ path.resolve('logs') }/${ name }.log`);

        this.initialise();
    }

    getStartTime = () => {
        const time = new Date();
        time.setMinutes(time.getMinutes() - time.getMinutes() % 30);
        time.setSeconds(0);
        time.setMilliseconds(0);

        return time;
    }

    getCurrentTime = () => {
        const time = new Date();
        time.setMilliseconds(0);

        return time;
    }

    getNextRespawn = (chrono) => {
        return RESPAWN.find((respawn) => chrono > respawn);
    }

    playAudio = (path) => {
        const status = this.player?.state?.status || AudioPlayerStatus.Idle;
        if (status === AudioPlayerStatus.Idle) {
            this.player.play(createAudioResource(fs.createReadStream(path)));
        }
    }

    killAll = () => {
        clearInterval(this.interval);
        this.player.stop(true);
        if (this.connection?.state?.status === VoiceConnectionStatus.Ready) {
            this.connection?.destroy();
        }
    }

    startCommand = async ({ guild: { id } }) => {
        this.logger.info('Start command launched.');

        this.logger.info(`Current : ${ this.getCurrentTime() }`);

        const guild = await this.client.guilds.cache.get(id);

        if (guild) {
            this.killAll();

            this.connection = joinVoiceChannel({
                channelId: this.voiceChannelId,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                group: this.ID
            });

            this.connection.subscribe(this.player);

            this.interval = setInterval(() => {
                try {
                    const chrono = 1800 - (this.getCurrentTime() - this.getStartTime()) / 1000;

                    switch (chrono - this.getNextRespawn(chrono)) {
                        case 1:
                            this.logger.info('Respawn (chrono: %s).', chrono);
                            this.playAudio(this.audio["respawning"]);
                            break;

                        case 2:
                            if (chrono < TimerBot.EXTRA_SPEACH) {
                                this.logger.info('1 second remaining (chrono: %s).', chrono);
                                this.playAudio(this.audio["1"]);
                            }
                            break;

                        case 3:
                            if (chrono < TimerBot.EXTRA_SPEACH) {
                                this.logger.info('2 seconds remaining (chrono: %s).', chrono);
                                this.playAudio(this.audio["2"]);
                            }
                            break;

                        case 4:
                            if (chrono < TimerBot.EXTRA_SPEACH) {
                                this.logger.info('3 seconds remaining (chrono: %s).', chrono);
                                this.playAudio(this.audio["3"]);
                            }
                            break;

                        case 5:
                            if (chrono < TimerBot.EXTRA_SPEACH) {
                                this.logger.info('4 seconds remaining (chrono: %s).', chrono);
                                this.playAudio(this.audio["4"]);
                            }
                            break;

                        case 6:
                            if (chrono < TimerBot.EXTRA_SPEACH) {
                                this.logger.info('5 seconds remaining (chrono: %s).', chrono);
                                this.playAudio(this.audio["5"]);
                            } else {
                                this.logger.info('5 seconds remaining (chrono: %s).', chrono);
                                this.playAudio(this.audio["5_second"]);
                            }
                            break;

                        case 11:
                            this.logger.info('10 seconds remaining (chrono: %s).', chrono);
                            this.playAudio(this.audio["10_second"]);
                            break;

                        case 21:
                            this.logger.info('20 seconds remaining (chrono: %s).', chrono);
                            this.playAudio(this.audio["20_second"]);
                            break;

                        case 31:
                            this.logger.info('30 seconds remaining (chrono: %s).', chrono);
                            this.playAudio(this.audio["30_second"]);
                            break;

                        case 41:
                            this.logger.info('40 seconds remaining (chrono: %s).', chrono);
                            this.playAudio(this.audio["40_second"]);
                            break;

                        case 51:
                            this.logger.info('50 seconds remaining (chrono: %s).', chrono);
                            this.playAudio(this.audio["50_second"]);
                            break;
                    }
                } catch (e) {
                    console.error(e);
                }
            }, 1000);
        }
    }

    stopCommand = () => {
        this.logger.info('Stop command launched.');

        this.killAll();
    }

    initialise = () => {
        this.client.login(this.token)
            .catch(console.error)
        ;

        this.client.once('ready', () => {
            this.logger.info('Client is ready.');

            this.client.guilds.cache.forEach(async (guild) => {
                const channel = guild.channels.cache.get(this.textChannelId);
                if (channel instanceof TextChannel) {
                    const startButton = new MessageButton({
                        customId: uuidv4(),
                        label: 'Start',
                        style: 'SUCCESS',
                        emoji: '⌚'
                    });

                    const stopButton = new MessageButton({
                        customId: uuidv4(),
                        label: 'Stop',
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

                    await channel.bulkDelete(
                        (await channel.messages.fetch()).filter(({ author: { id }}) => id === this.client.application.id),
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
                                    interaction.deferUpdate();
                                    break;
                                case stopButton.customId:
                                    this.stopCommand(interaction);
                                    interaction.deferUpdate();
                                    break;
                            }
                        }
                    })
                }
            })
        });
    }
}

export default TimerBot;
