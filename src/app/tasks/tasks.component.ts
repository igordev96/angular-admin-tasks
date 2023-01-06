import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToDoService } from '../services/to-do.service';
import { ToDo } from '../models/ToDo.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent {
  tasks$?: Observable<ToDo[]>;

  constructor(private toDoService: ToDoService) {}

  ngOnInit() {
    this.tasks$ = this.toDoService.tasksSubject$.asObservable();
  }

  addItem(task: FormControl<string>) {
    if (task.value) {
      this.toDoService.addTodo(new ToDo(task.value)).subscribe(() => {
        task.reset();
      });
    }
  }

  deleteItem(id: string) {
    this.toDoService.deleteTodo(id).subscribe();
  }
}
