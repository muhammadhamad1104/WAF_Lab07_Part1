//middlewares/logger.js
const fs = require('fs');
const path = require('path');

const logMiddleware = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.ip} | ${req.method} | ${req.originalUrl}\n`;
    const logPath = path.join(__dirname, '../logs.txt');
    fs.appendFileSync(logPath, log);
    console.log(log.trim());
    next();
}

module.exports = logMiddleware;