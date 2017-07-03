import fs from 'fs';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';

function getLogStream(logDirectory) {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  return rfs('access.log', {
    interval: '1d',
    path: logDirectory,
  });
}

export default function ({ logDirectory }) {
  if (process.env.NODE_ENV === 'production') {
    return morgan('combined', { stream: getLogStream(logDirectory) });
  }

  if (process.env.NODE_ENV === 'test') {
    return (req, res, next) => next();
  }

  return morgan('dev');
}
