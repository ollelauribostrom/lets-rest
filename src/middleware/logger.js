import fs from 'fs';
import morgan from 'morgan';
import rfs from 'rotating-file-stream';

export function getLogStream(logDirectory) {
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }

  return rfs('access.log', {
    interval: '1d',
    path: logDirectory,
  });
}

export default function ({ logDirectory }) {
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'production') {
    return morgan('combined', { stream: getLogStream(logDirectory) });
  }

  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'test') {
    return (req, res, next) => next();
  }

  /* istanbul ignore next */
  return morgan('dev');
}
