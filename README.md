NW_Timerbot
--------------

A free discord bot to call the respawn time of wars in the NEW WORLD game.

![](/demo.gif "Demo")

Installation
--------------

[Install FFmpeg](https://ffmpeg.org/)

[Install Python](https://www.python.org/)

[Install NodeJs](https://nodejs.org/)

[Install Yarn](https://yarnpkg.com/)

Download/Clone this repository.

Step by step for Windows
--------------
1. Install FFmpeg
- Download [FFmpeg](https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z).
- Extract the content.
- Rename the folder extracted to `ffmpeg`.
- Copy/Paste the folder into `C:\`.
- Edit the system environment variables and add the path `C:\ffmpeg\bin`.

2. Install Python
- Download [Python](https://www.python.org/ftp/python/3.11.0/python-3.11.0-amd64.exe).
- Launch the `.exe` file and don't forget to tick the option "**Add python.exe to PATH**"

3. Install NodeJs
- Download [NodeJs](https://nodejs.org/dist/v18.12.0/node-v18.12.0-x64.msi).
- Launch the `.msi` file.

4. Install Yarn
- Download [Yarn](https://github.com/yarnpkg/yarn/releases/download/v1.22.19/yarn-1.22.19.msi)
- Launch the `.msi` file.

5. Install Bot
- Download this [repository](https://codeload.github.com/BigChicChicken/NW_TimerBot/zip/refs/heads/main).
- Extract the content.
- Modify the file `.env` file like in [Configuration](https://github.com/BigChicChicken/NW_TimerBot#configuration).
- Open a command console into the root directory.
- (*Optional*) You can run these commands to check previous installations:
  - `ffmpeg --version`
  - `python --version`
  - `node --version`
  - `yarn --version`
- Run the command `yarn install` to install dependencies.
- Then the command `yarn prod` to start bot.

Configuration
--------------
In the `.env` update values with your data, like the example.

Under **BOTS**, you will have to define:
- **name**: The name of the bot, used to create an associated log file.
- **lang**: Choose the bot voice language. (available fr|en)
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
- `yarn install` : Install all necessary dependencies.
- `yarn prod` : Turn on bots.

Now the bots are ready to help you win your future wars. ⚔️

![](/screenshot.png "Screenshot")

HOW IT'S WORK ?
----------

The bot uses the clock of the system where it is hosted, so it will be necessary to check that the system is synchronized.

A war are always in a 30 min slot, like 8:30-9:00 or 10:00-10:30. From this information the bot will be able to automatically determine the time slot when it is launched (example if you launch it at 9:42, the slot will be 9:30-10:00).

Then it will automatically adjust the respawn time according to the progress of the war.

You can therefore launch it at any time:
- Before the war
- During the war
- And even launch it again during the war

Warning: It may happen that the New World servers have a desynchronization with real time, so there may be false respawns from time to time.

All respawning times are visible from the [config file](/src/config.js).

License
----------

This is completely free and released under the [MIT License](/LICENSE).
