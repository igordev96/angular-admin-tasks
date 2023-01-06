import { ToDo } from './ToDo.model';

export interface TodoResponse {
  limit: number;
  skip: number;
  todos: ToDo[];
  total: number;
}
