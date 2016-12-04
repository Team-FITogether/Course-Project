const winston = require("winston");

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            json: false,
            filename: "logs/administation-activity-log.txt"
        })
    ]
});

module.exports = logger;