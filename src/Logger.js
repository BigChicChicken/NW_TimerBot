import { Console } from "console";
import fs from "fs";

export default (path) => {
    const logger = new Console({
        stdout: fs.createWriteStream(path, { flags: 'a' })
    });

    const overwrite = [
        [logger.log, (message) => `[${ new Date().toLocaleString() }] [LOG] ${ message }`],
        [logger.info, (message) => `[${ new Date().toLocaleString() }] [INFO] ${ message }`],
        [logger.warn, (message) => `[${ new Date().toLocaleString() }] [WARN] ${ message }`],
        [logger.error, (message) => `[${ new Date().toLocaleString() }] [ERROR] ${ message }`]
    ];

    overwrite.forEach(([ _function, _format ]) => {
        logger[_function.name] = function() {
            arguments[0] = _format(arguments[0]);
            _function.apply(this, arguments);
        }
    });

    return logger;
}