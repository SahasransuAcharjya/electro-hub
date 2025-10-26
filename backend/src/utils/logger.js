const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../../logs');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const getLogFileName = () => {
  const date = new Date().toISOString().split('T')[0];
  return path.join(logDirectory, `${date}.log`);
};

const formatLog = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const metaString = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaString}\n`;
};

const writeLog = (level, message, meta) => {
  const logMessage = formatLog(level, message, meta);
  const logFile = getLogFileName();

  console.log(logMessage.trim());

  fs.appendFile(logFile, logMessage, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};

exports.info = (message, meta = {}) => {
  writeLog('info', message, meta);
};

exports.error = (message, meta = {}) => {
  writeLog('error', message, meta);
};

exports.warn = (message, meta = {}) => {
  writeLog('warn', message, meta);
};

exports.debug = (message, meta = {}) => {
  if (process.env.NODE_ENV === 'development') {
    writeLog('debug', message, meta);
  }
};

exports.http = (message, meta = {}) => {
  writeLog('http', message, meta);
};

exports.logRequest = (req) => {
  const logData = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  };
  writeLog('http', 'Incoming request', logData);
};

exports.logError = (error, req = null) => {
  const logData = {
    message: error.message,
    stack: error.stack,
    ...(req && {
      method: req.method,
      url: req.url,
      ip: req.ip
    })
  };
  writeLog('error', 'Error occurred', logData);
};

exports.logDatabaseQuery = (query, duration) => {
  const logData = {
    query,
    duration: `${duration}ms`
  };
  writeLog('debug', 'Database query executed', logData);
};

exports.clearOldLogs = (daysToKeep = 30) => {
  fs.readdir(logDirectory, (err, files) => {
    if (err) {
      console.error('Error reading log directory:', err);
      return;
    }

    const now = Date.now();
    const cutoffTime = daysToKeep * 24 * 60 * 60 * 1000;

    files.forEach(file => {
      const filePath = path.join(logDirectory, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;

        if (now - stats.mtime.getTime() > cutoffTime) {
          fs.unlink(filePath, err => {
            if (err) console.error('Error deleting old log:', err);
            else console.log('Deleted old log:', file);
          });
        }
      });
    });
  });
};
