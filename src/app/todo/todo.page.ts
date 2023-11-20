import { Component } from '@angular/core';
import { SQLiteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'todo.page.html',
  styleUrls: ['todo.page.scss'],
})
export class TodoPage {
  todos: any[] = [];

  constructor(private sqliteService: SQLiteService) {
    this.loadTodos();
  }

  async loadTodos(): Promise<void> {
    this.todos = await this.sqliteService.getTodos();
  }

  addTodo(): void {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      this.sqliteService
        .addTodo(taskName)
        .then(() => this.loadTodos())
        .catch((error) => console.error('Error adding todo', error));
    }
  }

  updateTodoStatus(id: number, completed: number): void {
    this.sqliteService
      .updateTodoStatus(id, completed)
      .then(() => this.loadTodos())
      .catch((error) => console.error('Error updating todo status', error));
  }

  deleteTodo(id: number): void {
    this.sqliteService
      .deleteTodo(id)
      .then(() => this.loadTodos())
      .catch((error) => console.error('Error deleting todo', error));
  }

  clearTodos(): void {
    this.sqliteService
      .clearTodos()
      .then(() => this.loadTodos())
      .catch((error) => console.error('Error clearing todos', error));
  }
}
