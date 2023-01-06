export class ToDo {
  id?: string;
  task: string;
  completed: boolean;
  userId: number;

  constructor(task: string, userId?: number, completed?: boolean) {
    this.task = task;
    this.completed = completed ?? false;
    this.userId = userId ?? Math.ceil(Math.random() * 47);
  }
}
