/**
 * Created by milad on 1/22/18.
 */
import config from '../config';

class MyModel {
  constructor({name, database}) {
    this.name = name;
    this.database = database;
    this.dbPrefix = config.application.applicationDBPrefix;
  }

  runFunction(functionName, {any, arguments, returnArg} = {}) {
    if (any) {
      return this.database.db.any(`SELECT * FROM "
        ${this.dbPrefix}_${this.name}_${functionName}"
        (${arguments ? arguments.map((arg, index) => `$${index + 1}`) : ''}) ${returnArg ? `AS "${returnArg}"` : ''}`
        , arguments ? arguments : undefined);
    }
    return this.database.db.oneOrNone(`SELECT * FROM "
        ${this.dbPrefix}_${this.name}_${functionName}"
        (${arguments ? arguments.map((arg, index) => `$${index + 1}`) : ''}) ${returnArg ? `AS "${returnArg}"` : ''}`
      , arguments ? arguments : undefined);
  }

  getAll() {
    return this.runFunction('getAll', {
      any: true
    });
  }

  getPage(offset, limit) {
    return this.runFunction('getPage', {
      any: true,
      arguments: [offset, limit]
    });
  }

  getById(id) {
    return this.database.db.one(`SELECT * FROM ${this.name} where id = ${id}`);
  }

  deleteById(id) {
    return this.runFunction('delete', {
      arguments: [id],
      returnArg: 'affectedRows'
    });
  }
}


export default MyModel;