import mssql from "mssql";
import { sqlConfig } from "../config/sqlConfig.js";

export class Connection {
  constructor() {
    this.pool = this.getConnection();
  }

  async getConnection() {
    const pool = await mssql.connect(sqlConfig);
    return pool;
  }

  createRequest(request, params) {
    for (const key in params) {
      request.input(key, params[key]);
    }
    return request;
  }

  async executeProcedure(procedureName, params) {
    const pool = await this.pool;
    let request = pool.request();
    if (params) {
      request = this.createRequest(request, params);
    }
    return await request.execute(procedureName);
  }

  async executeQuery(query, params) {
    const request = (await this.pool).request();
    if (params) {
      request = this.createRequest(request, params);
    }
    return await request.query(query);
  }
}
