/**
 * Created by milad on 1/22/18.
 */
import config from '../config';

class MyModel {
  constructor({name, database}) {
    this.name = name;
    this.database = database;
  }

  runFunction(dbPrefix, entityName, functionName, {any, args, returnArg} = {}) {
      return this.database.db.func(
        `"${dbPrefix}_${entityName}_${functionName}"`
        , args ? args : undefined);
  }

  getAll() {
    return this.runFunction('crm', this.name, 'getAll', {
      any: true
    });
  }

  getPage(offset, limit) {
    return this.runFunction('crm', this.name, 'getPage', {
      any: true,
      args: [offset, limit]
    });
  }

  getById(id) {
    return this.database.db.one(`SELECT * FROM ${this.name} where id = ${id}`);
  }

  deleteById(id) {
    return this.runFunction('crm', this.name,'delete', {
      args: [id],
      returnArg: 'affectedRows'
    });
  }
}


export default MyModel;