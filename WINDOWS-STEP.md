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
