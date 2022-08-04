A free discord bot to call the respawn time of wars in the NEW WORLD game.

Installation
--------------

[Install FFmpeg](https://ffmpeg.org/)

[Install NodeJs](https://nodejs.org/)

[Install Yarn](https://yarnpkg.com/)

Download/Clone this repository.

Configuration
--------------
In the `.env` update value with your data, like the exemple.

Under **BOTS**, you will have to define:
- **name**: The name of the bot, used to create an associated log file.
- **lang**: Choose the bot voice language. (avalaible fr|en)
- **token**: The token to connect to your discord api bot. [Dev Portal](https://discord.com/developers)
- **voiceChannelId**: The id of the channel where the bot connects.
- **textChannelId**: The id of the channel where the control buttons will be sent.

Under **MASTER_BOT**, you will have to define:
- **token**: The token to connect to your discord api bot. [Dev Portal](https://discord.com/developers)
- **textChannelId**: The id of the channel where the control buttons will be sent.

Exemple:
```dotenv
BOTS: '[
    {
        "name":"MyFirstBot",
        "lang": "en",
        "token":"my_first_bot_key",
        "voiceChannelId":"my_first_voice_channel_id",
        "textChannelId":"my_text_channel_id"
    },
    {
        "name":"MySecondBot",
        "lang": "en",
        "token":"my_second_bot_key",
        "voiceChannelId":"my_second_voice_channel_id",
        "textChannelId":"my_text_channel_id"
    }
]'
MASTER_BOT: '{
    "token":"my_master_bot_key",
    "textChannelId": "my_text_channel_id"
}'
```

USAGE
----------

Under the root folder of this repository, launch the following commands:
- `yarn install`: Install all necessary dependecies.
- `yarn prod`: Turn on bots.

Now the bots are ready to help you win your future wars. ⚔️

![](https://github.com/BigChicChicken/NW_TimerBot/blob/main/screenshot.png "Screenshot")

License
----------

This is completely free and released under the [MIT License](https://github.com/BigChicChicken/NW_TimerBot/blob/main/LICENSE).
