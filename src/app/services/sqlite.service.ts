import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  capConnectionOptions,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  //private db: any;
  db = CapacitorSQLite;
  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    const dbOptions: capConnectionOptions = {
      database: 'my-database',
      encrypted: false,
      mode: 'no-encryption',
      readonly: false,
    };

    // Use this.db as a reference to CapacitorSQLite for executing queries
    this.db = CapacitorSQLite;
    this.db.createConnection(dbOptions);
    this.db.open({ database: 'my-database', readonly: false });

    await this.createTable();
  }

  private async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_name TEXT NOT NULL,
        completed INTEGER DEFAULT 0
      )`;

    // Use CapacitorSQLite for running queries
    await this.db.run({
      database: 'my-database',
      statement: query,
      values: [],
    });
  }

  async addTodo(taskName: string): Promise<void> {
    const query = 'INSERT INTO todo (task_name) VALUES (?)';
    await this.db.run({
      database: 'my-database',
      statement: query,
      values: [taskName],
    });
  }

  async getTodos(): Promise<any[]> {
    const query = 'SELECT * FROM todo';
    const result = await this.db.query({
      database: 'my-database',
      statement: query,
      values: [],
    });
    return result?.values || [];
  }

  async updateTodoStatus(id: number, completed: number): Promise<void> {
    const query = 'UPDATE todo SET completed = ? WHERE id = ?';
    await this.db.run({
      database: 'my-database',
      statement: query,
      values: [completed, id],
    });
  }

  async deleteTodo(id: number): Promise<void> {
    const query = 'DELETE FROM todo WHERE id = ?';
    await this.db.run({
      database: 'my-database',
      statement: query,
      values: [id],
    });
  }

  async clearTodos(): Promise<void> {
    const query = 'DELETE FROM todo';
    await this.db.run({
      database: 'my-database',
      statement: query,
      values: [],
    });
  }
}
