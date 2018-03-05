/**
 * Created by milad on 1/22/18.
 */
import config from '../config';

class MyModel {
  constructor({name, database}) {
    this.name = name;
    this.database = database;
  }

  runFunction(dbPrefix, functionName, {any, args, returnArg} = {}) {
    if (any) {
      return this.database.db.func(
        `"${dbPrefix}_${this.name}_${functionName}"`
        , args ? args : undefined);
    }
    return this.database.db.func(
      `"${this.dbPrefix}_${this.name}_${functionName}"`
      , args ? args : undefined);
  }

  getAll() {
    return this.runFunction('crm', 'getAll', {
      any: true
    });
  }

  getPage(offset, limit) {
    return this.runFunction('crm', 'getPage', {
      any: true,
      args: [offset, limit]
    });
  }

  getById(id) {
    return this.database.db.one(`SELECT * FROM ${this.name} where id = ${id}`);
  }

  deleteById(id) {
    return this.runFunction('delete', {
      args: [id],
      returnArg: 'affectedRows'
    });
  }
}


export default MyModel;