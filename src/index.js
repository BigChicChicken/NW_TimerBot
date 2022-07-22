import TimerBot from "./TimerBot.js";
import MasterBot from "./MasterBot.js";
import dotenv from "dotenv"
import path from "path";

dotenv.config({ path: path.resolve('.env'), override: true });

const env = process.argv[2];
if (env) {
    dotenv.config({path: path.resolve(`.env.${ env }`), override: true});
}

const duration = 1000;
const bots = JSON.parse(process.env.BOTS);
const masterBot = JSON.parse(process.env.MASTER_BOT);

const timerBots = [];
bots.map((props, index) => {
    setTimeout(() => timerBots.push(new TimerBot(props)), index * duration);
});

setTimeout(() => new MasterBot({
    ...masterBot,
    bots: timerBots
}), (bots.length + 1) * duration)