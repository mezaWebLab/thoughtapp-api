import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Thoughts extends BaseSchema {
  protected tableName = 'thoughts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("body", 2000);
      table.string("hex");
      table.string("latitude");
      table.string("longitude");
      
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
