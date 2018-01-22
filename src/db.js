import config from './config';
import BlueBird from 'bluebird';
import pgPromise from 'pg-promise';

const options = {
  promiseLib: BlueBird
};

export default callback => {
  const pgp = pgPromise(options);
  let connectionConfiguration = config.database;

  const db = pgp(connectionConfiguration);

  callback({pgp, db});
}